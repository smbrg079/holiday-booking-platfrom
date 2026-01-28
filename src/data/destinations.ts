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
    },
    'Bali, Indonesia': {
        highlights: ['Ubud Monkey Forest', 'Tanah Lot Temple', 'Tegalalang Rice Terrace', 'Mount Batur'],
        longDescription: "Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. Known as the 'Island of the Gods', Bali offers a diverse landscape of hills and mountains, rugged coastlines and sandy beaches, lush rice terraces and barren volcanic hillsides.",
        sections: [
            {
                title: "Cultural Heart of Ubud",
                content: "Ubud is considered the cultural hub of Bali. It's where you'll find the most beautiful Balinese architecture, traditional dance performances, and an endless array of artisan workshops and galleries.",
                image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    },
    'Santorini, Greece': {
        highlights: ['Oia Sunsets', 'Fira Caldera Walk', 'Red Beach', 'Ancient Thera'],
        longDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera.",
        sections: [
            {
                title: "The Iconic Caldera",
                content: "The crescent-shaped caldera is the island's most defining feature. Looking out over the deep blue waters from the white-washed villages perched high on the cliffs is an experience like no other in the world.",
                image: "https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    },
    'Kyoto, Japan': {
        highlights: ['Fushimi Inari-taisha', 'Kinkaku-ji (Golden Pavilion)', 'Arashiyama Bamboo Grove', 'Gion District'],
        longDescription: "Kyoto was the capital of Japan for over a millennium. It is famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
        sections: [
            {
                title: "Tradition Meets Serenity",
                content: "In Kyoto, the past is always present. From the meticulously raked sand of Zen gardens to the elegant shift of a geisha's kimono, the city invites you to slow down and appreciate the beauty of detail.",
                image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    },
    'Marrakech, Morocco': {
        highlights: ['Jemaa el-Fnaa', 'Majorelle Garden', 'Bahia Palace', 'Koutoubia Mosque'],
        longDescription: "Marrakech, a former imperial city in western Morocco, is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating both to the Berber Empire, with mazelike alleys where thriving souks sell traditional textiles, pottery and jewelry.",
        sections: [
            {
                title: "The Red City",
                content: "Marrakech is known as the 'Red City' due to the distinctive ochre pigment used in its buildings. The atmospheric Jemaa el-Fnaa square is the heart of the city, where snake charmers, storytellers, and musicians create a spectacle that hasn't changed in centuries.",
                image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2070&auto=format&fit=crop"
            }
        ]
    }
};
