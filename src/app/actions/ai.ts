"use strict";

"use server";

import { chatWithAyoub, generateItinerary } from "@/lib/gemini";
import { ItineraryRequest } from "@/types/ai";

export async function askAyoub(message: string, history: { role: string, parts: { text: string }[] }[]) {
    return await chatWithAyoub(message, history);
}

export async function getPlan(details: ItineraryRequest) {
    return await generateItinerary(details);
}
