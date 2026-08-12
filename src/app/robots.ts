import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/checkout/success'],
    },
    sitemap: 'https://www.getergowellness.com/sitemap.xml',
  };
}
