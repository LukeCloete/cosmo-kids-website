import type { MetadataRoute } from "next";
import { getClasses, toClassSlug } from "@/lib/classData";
import { fetchNewsArticles, toArticleSlug } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

// Picks up classes and articles added in the CMS within the hour
export const revalidate = 3600;

const STATIC_PATHS = [
  "/",
  "/about-cosmo-kids",
  "/activities",
  "/admissions",
  "/contact",
  "/gallery",
  "/news-and-events",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [classes, articles] = await Promise.all([
    getClasses().catch((error) => {
      console.error("Error fetching classes for sitemap: ", error);
      return [];
    }),
    fetchNewsArticles().catch((error) => {
      console.error("Error fetching articles for sitemap: ", error);
      return [];
    }),
  ]);

  const paths = [
    ...STATIC_PATHS,
    ...classes.map((cls) => `/classes/${toClassSlug(cls.classname)}`),
    ...articles.map(
      (article) =>
        `/news-and-events/${encodeURIComponent(toArticleSlug(article.title))}`
    ),
  ];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
