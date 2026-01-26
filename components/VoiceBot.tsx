
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

// --- Audio Utility Functions ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const VoiceBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("System API Key missing. Please check infrastructure configuration.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Initialize Contexts
      inputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Explicitly resume for browser security
      await inputAudioCtxRef.current.resume();
      await outputAudioCtxRef.current.resume();

      // Request Mic
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micErr) {
        throw new Error("Microphone access denied. Please enable mic permissions in your browser settings to use the Voice Architect.");
      }

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setError(null);
            
            // Start streaming from mic
            const source = inputAudioCtxRef.current!.createMediaStreamSource(streamRef.current!);
            const scriptProcessor = inputAudioCtxRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioCtxRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              const ctx = outputAudioCtxRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                try { source.stop(); } catch(e) {}
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: (e) => {
            console.error("Live API Error:", e);
            setError("The neural link was interrupted. This usually happens due to unstable network connectivity.");
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'You are Sumahi, a high-performance AI Infrastructure Consultant. You help agency owners understand how AI can eliminate manual bottlenecks like sales proposals and content repurposing. Be direct, professional, and focus on ROI and agency velocity.',
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to initialize secure voice link.");
      setIsActive(false);
      setIsConnecting(false);
      // Clean up if partial failure
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    setIsActive(false);
    setIsSpeaking(false);
    setIsConnecting(false);
    nextStartTimeRef.current = 0;
    sourcesRef.current.clear();
  };

  const toggleModal = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      stopSession();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-8 left-8 z-[60] flex flex-col items-start gap-4">
        <button 
          onClick={toggleModal}
          className="relative group w-16 h-16 rounded-full bg-slate-900 text-emerald-500 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-500/20"
        >
          <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-pulse"></div>
          <svg className={`w-8 h-8 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            )}
          </svg>
        </button>
        {!isOpen && (
          <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-2xl border border-slate-800 text-sm font-bold animate-fade-in hidden md:block">
            Talk to AI Architect
            <div className="absolute -bottom-1 left-6 w-2 h-2 bg-slate-900 border-l border-t border-slate-800 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Voice Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="bg-slate-900 w-full max-w-xl rounded-[3rem] p-12 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            
            <button 
              onClick={toggleModal}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center space-y-4 mb-12">
              <div className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/20">
                Sumahi Infrastructure Live
              </div>
              <h3 className="text-3xl font-bold text-white font-lexend">Voice Architect</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Discuss your agency scaling roadmap in real-time with our technical AI core.
              </p>
            </div>

            {/* Visualizer Orb */}
            <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
              <div className={`absolute inset-0 border border-emerald-500/20 rounded-full transition-transform duration-1000 ${isActive ? 'animate-spin-slow' : ''}`}></div>
              <div className={`absolute inset-4 border border-emerald-500/10 rounded-full transition-transform duration-700 ${isActive ? 'animate-spin-reverse-slow' : ''}`}></div>
              
              <div className={`relative w-32 h-32 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border border-emerald-500/30 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] ${isActive ? 'scale-105' : 'scale-100'} transition-transform duration-500`}>
                {isActive ? (
                  <div className="flex items-center gap-1.5 h-12">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 bg-emerald-500 rounded-full transition-all duration-150 ${
                          isSpeaking ? 'animate-visualizer-high' : 'animate-visualizer-low'
                        }`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className={`w-4 h-4 rounded-full bg-emerald-500/20 ${isConnecting ? 'animate-ping' : 'animate-pulse'}`}></div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="w-full space-y-6 flex flex-col items-center relative z-10">
              {error && (
                <div className="text-red-400 text-center text-sm font-bold bg-red-500/10 px-6 py-4 rounded-2xl border border-red-500/20 max-w-sm">
                  {error}
                  {error.includes("Microphone") && (
                    <div className="mt-2 text-xs font-medium text-slate-500">
                      Look for a camera/mic icon in your address bar to enable access.
                    </div>
                  )}
                </div>
              )}
              
              {!isActive ? (
                <button 
                  onClick={startSession}
                  disabled={isConnecting}
                  className={`bg-emerald-600 text-white px-12 py-5 rounded-2xl text-lg font-black transition-all shadow-2xl flex items-center gap-3 ${
                    isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Initializing...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8a8 8 0 11-8 8z" /></svg>
                      Initialize Link
                    </>
                  )}
                </button>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-emerald-400 animate-pulse text-sm font-bold uppercase tracking-widest">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Link Active: Talk Now
                  </div>
                  <button 
                    onClick={stopSession}
                    className="text-slate-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Terminate Session
                  </button>
                </div>
              )}
            </div>

            <div className="mt-12 text-slate-500 text-[10px] font-medium tracking-tight uppercase opacity-50">
              Secured AES-256 Voice Infrastructure
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 8s linear infinite; }
        
        @keyframes visualizer-low {
          0%, 100% { height: 8px; opacity: 0.3; }
          50% { height: 16px; opacity: 0.6; }
        }
        @keyframes visualizer-high {
          0%, 100% { height: 12px; opacity: 0.6; }
          50% { height: 40px; opacity: 1; }
        }
        .animate-visualizer-low { animation: visualizer-low 0.8s infinite ease-in-out; }
        .animate-visualizer-high { animation: visualizer-high 0.4s infinite ease-in-out; }
      `}</style>
    </>
  );
};

export default VoiceBot;
