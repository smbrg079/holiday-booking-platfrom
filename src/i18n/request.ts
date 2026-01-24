import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async (params: any) => {
    // Support both old and new next-intl parameter patterns
    const locale = (await params.requestLocale) || params.locale || routing.defaultLocale;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
