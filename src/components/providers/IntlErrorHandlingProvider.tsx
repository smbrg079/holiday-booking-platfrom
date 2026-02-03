'use client';

import { NextIntlClientProvider } from 'next-intl';

const NAVBAR_FALLBACKS: Record<string, string> = {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
};

export default function IntlErrorHandlingProvider({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale: string;
}) {
    return (
        <NextIntlClientProvider
            locale={locale}
            getMessageFallback={({ namespace, key }) => {
                if (namespace === 'Navbar' && key && NAVBAR_FALLBACKS[key]) {
                    return NAVBAR_FALLBACKS[key];
                }
                return `${namespace}.${key}`;
            }}
        >
            {children}
        </NextIntlClientProvider>
    );
}
