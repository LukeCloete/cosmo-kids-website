import type { Metadata } from "next";

export const SITE_URL = "https://cosmokids.com.na";
export const SITE_NAME = "Cosmo Kids";
export const DEFAULT_TITLE =
  "Cosmo Kids | Pre-School & Aftercare in Windhoek, Namibia";
export const DEFAULT_DESCRIPTION =
  "Cosmo Kids is a private pre-school, play-school and aftercare centre in Windhoek, Namibia, caring for children from 6 months to Grade 0 since 2006.";
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Cosmo Kids - private pre-school, play-school and aftercare in Windhoek",
};

// Collapses CMS text (newlines, double spaces) and trims it to search-snippet length
export function toMetaDescription(text: string, maxLength = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

interface PageMetadataOptions {
  title?: string;
  description: string;
  path: string;
  image?: string;
  openGraphType?: "website" | "article";
}

// Child metadata replaces (not merges) parent openGraph/twitter objects, and a
// layout with its own title stops the root title template reaching its pages,
// so every page builds the full set (with an absolute title) here.
export function pageMetadata({
  title,
  description,
  path,
  image,
  openGraphType = "website",
}: PageMetadataOptions): Metadata {
  const images = image ? [{ url: image, alt: title }] : [DEFAULT_OG_IMAGE];
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: openGraphType,
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((img) => img.url),
    },
  };
}
