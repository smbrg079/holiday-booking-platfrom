'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Check authentication and role
async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session;
}

const DestinationSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    image: z.string().url().optional().or(z.literal('')),
});

const ActivitySchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    price: z.number().positive(),
    duration: z.string().min(2),
    destinationId: z.string().min(1),
    categoryId: z.string().min(1),
    images: z.string().optional(),
    included: z.string().optional(),
    excluded: z.string().optional(),
    itinerary: z.string().optional(),
});

export async function createDestination(formData: FormData) {
    await checkAdmin();

    const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        image: formData.get('image') as string,
    };

    const validated = DestinationSchema.safeParse(data);

    if (!validated.success) {
        return { error: 'Invalid data' };
    }

    try {
        await prisma.destination.create({
            data: validated.data,
        });
        revalidatePath('/admin/destinations');
        return { success: true };
    } catch (error) {
        console.error('Create Destination Error:', error);
        return { error: 'Failed to create destination' };
    }
}

export async function deleteDestination(id: string) {
    await checkAdmin();
    try {
        await prisma.destination.delete({ where: { id } });
        revalidatePath('/admin/destinations');
        return { success: true };
    } catch {
        return { error: 'Failed to delete destination' };
    }
}

const BookingStatusSchema = z.enum(["PENDING", "CONFIRMED", "CANCELLED"]);

export async function updateBookingStatus(id: string, status: string) {
    await checkAdmin();

    const validated = BookingStatusSchema.safeParse(status);
    if (!validated.success) {
        return { error: 'Invalid status' };
    }

    try {
        await prisma.booking.update({
            where: { id },
            data: { status: validated.data }
        });
        revalidatePath('/admin/dashboard');
        revalidatePath('/admin/bookings');
        return { success: true };
    } catch {
        return { error: 'Failed to update booking' };
    }
}

export async function createActivity(formData: FormData) {
    await checkAdmin();

    const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        duration: formData.get('duration') as string,
        destinationId: formData.get('destinationId') as string,
        categoryId: formData.get('categoryId') as string,
        images: formData.get('images') as string || '[]',
        included: formData.get('included') as string || '[]',
        excluded: formData.get('excluded') as string || '[]',
        itinerary: formData.get('itinerary') as string || '[]',
    };

    const validated = ActivitySchema.safeParse(data);

    if (!validated.success) {
        console.error('Validation Error:', validated.error);
        return { error: 'Invalid activity data' };
    }

    try {
        await prisma.activity.create({
            data: validated.data,
        });
        revalidatePath('/admin/activities');
        revalidatePath('/activities');
        return { success: true };
    } catch (error) {
        console.error('Create Activity Error:', error);
        return { error: 'Failed to create activity' };
    }
}

export async function deleteActivity(id: string) {
    await checkAdmin();
    try {
        await prisma.activity.delete({ where: { id } });
        revalidatePath('/admin/activities');
        revalidatePath('/activities');
        return { success: true };
    } catch {
        return { error: 'Failed to delete activity' };
    }
}
