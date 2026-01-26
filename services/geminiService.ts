
import { GoogleGenAI } from "@google/genai";

export const runGrowthAudit = async (niche: string, teamSize: string, bottleneck: string): Promise<string> => {
  // Create instance inside the function as per guidelines to ensure freshest key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Act as a World-Class AI Operations & Growth Consultant for "Sumahi Ai". 
    Analyze the following marketing agency profile and provide a highly professional, structured growth roadmap.
    
    Agency Profile:
    - Niche: ${niche}
    - Team Size: ${teamSize}
    - Primary Manual Bottleneck: ${bottleneck}
    
    Structure your response with:
    1. THE PROBLEM: A brief analysis of why the specified bottleneck is costing them revenue (be specific and aggressive).
    2. THE SOLUTION: How "Sumahi's AI Infrastructure Stack" (AI Sales OS, AI Content OS, and AI Ad Guardrails) solves this.
    3. THE NUMBERS: Estimated ROI - project recovery of lead response time, content output, or ad spend.
    4. THE VERDICT: A concluding high-impact statement about the cost of inaction.

    Format the output using clear Markdown headings and bullet points. Use a professional, premium, and authoritative tone.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 1024,
        // When maxOutputTokens is used with Gemini 3 models, thinkingBudget should be managed.
        // Disabling thinking budget ensures maximum tokens are available for the final response.
        thinkingConfig: { thinkingBudget: 0 },
      }
    });

    return response.text || "I was unable to generate a report at this time. Please try again later.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // If the error suggests missing project or key, we throw specifically
    if (error.message?.includes("entity was not found") || error.message?.includes("API key")) {
      throw new Error("Neural Core authentication failed. Please re-initialize infrastructure.");
    }
    throw new Error("Failed to communicate with AI Auditor. Please check your connection.");
  }
};
