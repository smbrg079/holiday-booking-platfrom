"use strict";

"use server";

import { chatWithAyoub, generateItinerary } from "@/lib/gemini";
import { ItineraryRequest } from "@/types/ai";

export async function askAyoub(message: string, history: any[]) {
    return await chatWithAyoub(message, history);
}

export async function getPlan(details: ItineraryRequest) {
    return await generateItinerary(details);
}
