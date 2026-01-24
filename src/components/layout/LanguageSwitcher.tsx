'use client';

import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Extract the current locale from the pathname
    const segments = pathname.split('/');
    const currentLocale = segments[1];

    const languages: Record<string, string> = {
        en: 'English',
        ar: 'العربية',
        de: 'Deutsch',
        pl: 'Polski',
        fr: 'Français'
    };

    const handleLocaleChange = (newLocale: string) => {
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPath || `/${newLocale}`);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 font-bold text-sm border border-slate-100"
            >
                <Globe size={18} className="text-indigo-600" />
                <span className="uppercase">{currentLocale}</span>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                    {routing.locales.map((locale) => (
                        <button
                            key={locale}
                            onClick={() => handleLocaleChange(locale)}
                            className={cn(
                                "w-full text-left px-4 py-2 text-sm font-bold hover:bg-slate-50 transition-colors",
                                currentLocale === locale ? "text-indigo-600 bg-indigo-50/50" : "text-slate-600"
                            )}
                        >
                            {languages[locale]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
