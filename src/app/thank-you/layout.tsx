import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Shown after a form submission, so keep it out of search results
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Thank You",
    description: "Thanks for getting in touch with Cosmo Kids.",
    path: "/thank-you",
  }),
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
