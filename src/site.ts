// Site-wide settings. Keep page copy in the pages, not here.

/**
 * Preview builds are noindexed. At launch set this to false.
 * /pitch is unaffected: it is noindexed by its own meta tag and the X-Robots-Tag header in vercel.json, permanently.
 */
export const NOINDEX = true;

export const SITE_NAME = 'EdTerm';
export const CONTACT_EMAIL = 'partners@edterm.com';
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvgkkvr';

/** Primary navigation. Never add /pitch or /lis. */
export const NAV = [
  { href: '/reasoning-layer', label: 'The Reasoning Layer' },
  { href: '/health-systems', label: 'For Health Systems' },
  { href: '/education', label: 'For Education' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/company', label: 'Company' },
] as const;

export const EARLY_ACCESS = { href: '/early-access', label: 'Early Access' } as const;
