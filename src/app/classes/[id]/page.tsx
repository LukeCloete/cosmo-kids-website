import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClassDetails from "@/components/ClassDetails";
import { getClasses, toClassSlug } from "@/lib/classData";
import { pageMetadata, toMetaDescription } from "@/lib/seo";

interface ClassPageProps {
  params: {
    id: string;
  };
}

// Pages are pre-rendered with their content (so search engines can read it)
// and re-fetched from the CMS at most every 5 minutes
export const revalidate = 300;

// Shared by generateMetadata and the page so each render queries Firestore once
const getClassBySlug = cache(async (slug: string) => {
  const classes = await getClasses();
  return classes.find((cls) => toClassSlug(cls.classname) === slug) ?? null;
});

export async function generateStaticParams() {
  try {
    const classes = await getClasses();
    return classes.map((cls) => ({ id: toClassSlug(cls.classname) }));
  } catch (error) {
    // Don't fail the build if Firestore is unreachable; pages render on demand
    console.error("Error pre-rendering class pages: ", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ClassPageProps): Promise<Metadata> {
  const classData = await getClassBySlug(params.id);
  if (!classData) return {};

  return pageMetadata({
    title: `${classData.classname} (${classData.ageRange})`,
    description: toMetaDescription(classData.description),
    path: `/classes/${params.id}`,
  });
}

export default async function ClassPage({ params }: ClassPageProps) {
  const classData = await getClassBySlug(params.id);
  if (!classData) notFound();

  return <ClassDetails classData={classData} />;
}
