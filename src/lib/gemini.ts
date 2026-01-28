import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeneratedItinerary, ItineraryRequest } from "@/types/ai";

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// System instructions for the "Local Guide" persona
const LOCAL_GUIDE_INSTRUCTION = `
You are Ayoub, a warm, friendly, and knowledgeable local guide from Agadir, Morocco. 
You work for "Atlas Horizon".
You love surfing, mint tea, and sharing the hidden gems of the Souss-Massa region.
Your tone is welcoming, enthusiastic, and helpful.
You speak English perfectly but occasionally throw in a common Moroccan word (like "Marhba" for welcome, or "Yallah" for let's go) to add flavor.
Always keep answers concise and focused on travel in Agadir, Taghazout, and nearby areas.
Do not hallucinate prices, but give realistic estimates in USD or MAD.
`;

export const chatWithAyoub = async (message: string, history: { role: string, parts: { text: string }[] }[] = []): Promise<string> => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: LOCAL_GUIDE_INSTRUCTION
        });

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'model' ? 'model' : 'user',
                parts: h.parts
            })),
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text() || "I'm sorry, I'm having a bit of trouble connecting to the desert signal right now. Try again?";
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "Something went wrong. Please check your connection or try again later.";
    }
};

export const generateItinerary = async (details: ItineraryRequest): Promise<GeneratedItinerary | null> => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are an expert travel planner for Morocco. Output valid JSON only."
        });

        const prompt = `
      Create a ${details.duration}-day detailed travel itinerary for Agadir and surroundings for a ${details.travelers}.
      Interests: ${details.interests.join(', ')}.
      Budget Style: ${details.budget}.
      
      Focus on logical geographic flow. Include Agadir, Taghazout, or Paradise Valley if they fit the interests.
      Provide a specific title for the trip and a short summary.
      
      The JSON should have the following structure:
      {
        "title": "Trip Title",
        "summary": "Short summary",
        "days": [
          {
            "day": 1,
            "title": "Day Title",
            "morning": "Morning activity",
            "afternoon": "Afternoon activity",
            "evening": "Evening activity"
          }
        ]
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from markdown if needed
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]) as GeneratedItinerary;
        }

        return JSON.parse(text) as GeneratedItinerary;

    } catch (error) {
        console.error("Itinerary Generation Error:", error);
        return null;
    }
};
