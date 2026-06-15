// Types for the Premium Real Estate Platform

export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'penthouse' | 'commercial' | 'office' | 'retail' | 'business';
  category: 'residential' | 'commercial';
  price: number;
  pricePerSqm: number;
  area: number;
  rooms?: number;
  floor?: number;
  totalFloors?: number;
  district: string;
  developer?: string;
  completionDate?: string;
  yield?: number;
  class: 'economy' | 'comfort' | 'business' | 'premium' | 'elite';
  images: string[];
  description: string;
  features: string[];
  hasVideo: boolean;
  has3DTour: boolean;
  mortgageAvailable: boolean;
  investmentScore: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FilterState {
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  districts: string[];
  developers: string[];
  propertyType: string[];
  class: string[];
  yieldMin: number;
  completionDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestedActions?: ChatAction[];
}

export interface ChatAction {
  label: string;
  type: 'filter' | 'property' | 'contact' | 'calculator';
  value?: any;
}

export interface ChatState {
  step: number;
  budget?: string;
  purpose?: string;
  district?: string;
  area?: string;
  name?: string;
  phone?: string;
  telegram?: string;
  selectedProperties: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string }[];
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  completed: boolean;
}

export interface Lead {
  id: string;
  source: string;
  name: string;
  phone: string;
  telegram?: string;
  email?: string;
  purpose: string;
  budget: string;
  district: string;
  selectedProperties: string[];
  chatHistory: ChatMessage[];
  createdAt: Date;
  status: 'new' | 'contacted' | 'qualified' | 'meeting' | 'closed';
}

export interface MortgageCalculation {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export interface InvestmentCalculation {
  propertyPrice: number;
  rentalIncome: number;
  expenses: number;
  netIncome: number;
  yield: number;
  paybackPeriod: number;
  roi5Years: number;
}

export interface District {
  id: string;
  name: string;
  averagePrice: number;
  properties: number;
}

export interface Developer {
  id: string;
  name: string;
  logo: string;
  properties: number;
  rating: number;
}
