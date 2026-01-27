export const richDestinationData: Record<string, {
    highlights: string[];
    longDescription: string;
    sections: { title: string; content: string; image?: string }[];
}> = {
    'Agadir': {
        highlights: ['Golden Sandy Beaches', 'Souk El Had', 'Agadir Oufella (Kasbah)', 'Marina Agadir'],
        longDescription: "Agadir is a major city in Morocco, on the shore of the Atlantic Ocean near the foot of the Atlas Mountains. It's known for its golf courses, wide crescent beach and seaside promenade lined with cafes, restaurants and bars. Agadir's hilltop kasbah was destroyed in a 1960 earthquake, but its original old wall remains standing.",
        sections: [
            {
                title: "The Golden Bay",
                content: "Agadir is famous for its shoreline. The 10km long beach offers clean sand and inviting waters, perfect for surfing, swimming, or simply soaking up the sun. The promenade is the heart of the tourist action, offering a lively atmosphere day and night.",
                image: "https://images.unsplash.com/photo-1542345759-3d120afa748d?q=80&w=2070&auto=format&fit=crop"
            },
            {
                title: "Souk El Had",
                content: "Dive into the vibrant culture of Agadir at Souk El Had, one of the largest markets in the region. With over 6,000 stalls, you can find everything from fresh spices and produce to traditional crafts, leather goods, and Argan oil.",
                image: "https://images.unsplash.com/photo-1512418490979-59295d486515?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    },
    'Taroudant': {
        highlights: ['Ancient City Walls', 'Traditional Souks', 'Berber Culture', 'Tiout Oasis'],
        longDescription: "Often called the 'Grandmother of Marrakech', Taroudant offers a more relaxed and authentic glimpse into Moroccan history. Enclosed by magnificent red-mud walls, this market town is located in the Souss Valley and serves as a trading hub for the region.",
        sections: [
            {
                title: "The Red Walls",
                content: "The city is famous for its 6km of exceptionally well-preserved ramparts. You can take a horse-drawn carriage ride around the walls to admire their grandeur and the 9 arched gates that serve as entry points to the medina.",
                image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop"
            },
            {
                title: "Artisanal Crafts",
                content: "Taroudant is renowned for its crafts, particularly jewelry and carpets. The souks here are less hassle than in larger cities, allowing you to browse and chat with artisans as they work on leather, silver, and stone.",
                image: "https://images.unsplash.com/photo-1590418606746-d871c88f980e?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    }
};
