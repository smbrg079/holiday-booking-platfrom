import { getServerSession } from "next-auth/next";
import { redirect } from "@/i18n/routing";
import { authOptions } from "@/lib/auth";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Map, Bike, CalendarCheck, Settings } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AdminLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    await params;
    const session = await getServerSession(authOptions);
    const t = await getTranslations('Admin');

    if (!session || session.user?.role !== "ADMIN") {
        redirect({ href: "/login" });
    }

    const navItems = [
        { name: t('dashboard'), href: "/admin/dashboard", icon: LayoutDashboard },
        { name: t('destinations'), href: "/admin/destinations", icon: Map },
        { name: t('activities'), href: "/admin/activities", icon: Bike },
        { name: t('bookings'), href: "/admin/bookings", icon: CalendarCheck },
        { name: t('settings'), href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen pt-24 bg-slate-50">
            {/* Sidebar - Hidden on mobile, simple implementation */}
            <aside className="hidden lg:block w-64 bg-white border-r border-slate-100 fixed h-[calc(100vh-96px)] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t('adminMenu')}</h2>
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-bold transition-colors"
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-6 lg:p-12">
                {children}
            </div>
        </div>
    );
}
