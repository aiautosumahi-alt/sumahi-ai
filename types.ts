
export interface AuditorState {
  agencyNiche: string;
  teamSize: string;
  bottleneck: string;
  isProcessing: boolean;
  result: string | null;
  error: string | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  name: string;
  href: string;
}
