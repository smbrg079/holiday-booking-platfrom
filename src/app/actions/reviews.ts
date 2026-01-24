'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ReviewSchema = z.object({
    activityId: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(5).max(500),
});

export async function submitReview(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return { error: "You must be logged in to leave a review." };
    }

    const data = {
        activityId: formData.get("activityId") as string,
        rating: parseInt(formData.get("rating") as string),
        comment: formData.get("comment") as string,
    };

    const validated = ReviewSchema.safeParse(data);
    if (!validated.success) {
        return { error: "Invalid review data. Comment must be 5-500 characters." };
    }

    // Check if user has actually booked this activity
    const hasBooked = await prisma.booking.findFirst({
        where: {
            userId: session.user.id,
            activityId: validated.data.activityId,
            status: "CONFIRMED"
        }
    });

    if (!hasBooked) {
        return { error: "You can only review activities you have successfully booked and completed." };
    }

    try {
        await prisma.review.create({
            data: {
                userId: session.user.id,
                activityId: validated.data.activityId,
                rating: validated.data.rating,
                comment: validated.data.comment,
            }
        });

        revalidatePath(`/activities/${validated.data.activityId}`);
        return { success: true };
    } catch (error) {
        console.error("Review Error:", error);
        return { error: "Failed to submit review. Maybe you already reviewed this?" };
    }
}
