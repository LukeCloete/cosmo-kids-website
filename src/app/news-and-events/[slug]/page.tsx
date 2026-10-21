import { cache } from "react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ArticleDetails from "@/components/ArticleDetails";
import { fetchNewsArticles, toArticleSlug } from "@/lib/data";
import { pageMetadata, toMetaDescription } from "@/lib/seo";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Pages are pre-rendered with their content (so search engines can read it)
// and re-fetched from the CMS at most every 5 minutes
export const revalidate = 300;

const articlePath = (title: string) =>
  `/news-and-events/${encodeURIComponent(toArticleSlug(title))}`;

// Slugs can contain emoji and brackets, which may arrive percent-encoded
const decodeSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

// Shared by generateMetadata and the page so each render queries Firestore once.
// Older links used the Firestore document id, so that is matched too.
const getArticle = cache(async (slug: string) => {
  const articles = await fetchNewsArticles();
  const bySlug = articles.find((a) => toArticleSlug(a.title) === slug);
  if (bySlug) return { article: bySlug, matchedById: false };
  const byId = articles.find((a) => a.id === slug);
  return byId ? { article: byId, matchedById: true } : null;
});

export async function generateStaticParams() {
  try {
    const articles = await fetchNewsArticles();
    return articles.map((a) => ({ slug: toArticleSlug(a.title) }));
  } catch (error) {
    // Don't fail the build if Firestore is unreachable; pages render on demand
    console.error("Error pre-rendering article pages: ", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const result = await getArticle(decodeSlug(params.slug));
  if (!result) return {};
  const { article } = result;

  return pageMetadata({
    title: article.title.trim(),
    description: toMetaDescription(article.description),
    path: articlePath(article.title),
    image: article.imageUrl || undefined,
    openGraphType: "article",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const result = await getArticle(decodeSlug(params.slug));
  if (!result) notFound();
  if (result.matchedById) permanentRedirect(articlePath(result.article.title));

  return <ArticleDetails article={result.article} />;
}
