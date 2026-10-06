import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const base = 'https://talkys.ai';

const pages: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/use-cases/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy-policy/', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/terms-of-service/', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cookie-policy/', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
