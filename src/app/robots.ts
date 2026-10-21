import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Hidden public/__*.html forms exist only for Netlify Forms detection.
      // /thank-you is not blocked here: it uses a noindex tag, which crawlers
      // can only see if they are allowed to fetch the page.
      disallow: "/__",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
