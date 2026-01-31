import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localePrefix: 'as-needed' // Sin prefijo para español, /en/ para inglés
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
