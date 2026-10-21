import { pageMetadata } from "@/lib/seo";

// The page is a client component, so its metadata lives here
export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photos from daily life at Cosmo Kids: our little ones learning, playing and growing in a safe, happy pre-school in Windhoek.",
  path: "/gallery",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
