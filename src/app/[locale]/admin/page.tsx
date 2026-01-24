import { redirect } from "@/i18n/routing";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
    await params; // Ensure params are resolved in Next.js 15
    redirect({ href: "/admin/dashboard" });
}
