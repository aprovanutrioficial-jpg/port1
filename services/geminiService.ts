import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

// Initialize Gemini
// Note: In a real app, ensure process.env.API_KEY is defined. 
// For this demo, we assume the environment is set up correctly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getProductRecommendations = async (query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure your environment.";
  }

  const productContext = MOCK_PRODUCTS.map(p => `${p.title} (${p.category}): ${p.description}`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a helpful assistant for a PDF digital store called "AprovaPortuguês".
        User Query: "${query}"
        
        Here is our product catalog:
        ${productContext}
        
        Please recommend the best products from our catalog that match the user's needs. 
        Explain why briefly. If nothing matches perfectly, suggest general topics we might have or be polite.
        Keep it short (under 100 words).
      `,
    });

    return response.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao conectar com a IA. Tente novamente mais tarde.";
  }
};