export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
    isThinking?: boolean;
}

export interface ItineraryRequest {
    duration: number; // days
    travelers: string; // "couple", "family", "solo"
    interests: string[];
    budget: string;
}

export interface GeneratedItinerary {
    title: string;
    summary: string;
    days: {
        day: number;
        title: string;
        morning: string;
        afternoon: string;
        evening: string;
    }[];
}
