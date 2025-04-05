const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ChatbotRequest {
  query: string;
  use_mock?: boolean;
}

export interface ChatbotResponse {
  response: string;
}

export interface LiteracyData {
  lessons: {
    id: number;
    title: string;
    description: string;
    content: string;
    quiz: {
      question: string;
      options: string[];
      correct: number;
    }[];
  }[];
}

export interface RecommendationRequest {
  age: number;
  income: number;
  riskLevel: 'low' | 'medium' | 'high';
  goals: string[];
}

export interface Recommendation {
  type: string;
  risk: string;
  rationale: string;
  learnMoreUrl: string;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
}

export interface MarketData {
  indices: {
    name: string;
    value: number;
    change: number;
  }[];
  top_gainers: {
    symbol: string;
    name: string;
    price: number;
    change: number;
  }[];
  top_losers: {
    symbol: string;
    name: string;
    price: number;
    change: number;
  }[];
}

export interface ProfileData {
  name: string;
  age: number;
  riskAppetite: string;
  goals: string[];
  preferredProducts: string[];
}

// API client functions
export const api = {
  // Chatbot
  async sendChatMessage(query: string, useMock: boolean = false): Promise<ChatbotResponse> {
    const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, use_mock: useMock }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Financial Literacy
  async getLiteracyData(): Promise<LiteracyData> {
    const response = await fetch(`${API_BASE_URL}/api/literacy`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Investment Recommendations
  async getRecommendations(data: RecommendationRequest): Promise<RecommendationResponse> {
    const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Market Insights
  async getMarketData(): Promise<MarketData> {
    const response = await fetch(`${API_BASE_URL}/api/insights`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  // User Profile
  async saveProfile(data: ProfileData): Promise<{ message: string; data: ProfileData }> {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};
