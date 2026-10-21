import { pageMetadata } from "@/lib/seo";

// The page is a client component, so its metadata lives here
export const metadata = pageMetadata({
  title: "Admissions",
  description:
    "Enquire about enrolling your child at Cosmo Kids in Windhoek. Classes from babies (6 months) to Grade 0, plus aftercare.",
  path: "/admissions",
});

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
