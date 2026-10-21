import About from "@/components/About";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import ServicesSection from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import SchoolVideos from "@/components/SchoolVideos";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  pageMetadata,
} from "@/lib/seo";

export const metadata = pageMetadata({
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

// Structured data so search engines can show the school's details
// (address, map pin, contact) - keep in sync with the Contact page
const preschoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2006-07",
  telephone: "+264 83 727 7676",
  email: "admissions@cosmokids.com.na",
  address: {
    "@type": "PostalAddress",
    streetAddress: "32 General Murtala Muhammed Rd",
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.546234,
    longitude: 17.088366,
  },
  sameAs: ["https://www.instagram.com/cosmo_kids_nam/"],
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(preschoolJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Junior & Senior School Videos (hero buttons scroll here) */}
      <SchoolVideos />

      {/* About Section */}
      <About />

      {/* Programs Section */}
      <Programs />

      <Team />

      {/* Benefits Section */}
      <ServicesSection />

      <Gallery />

      {/* Testimonials Section */}
      <Testimonials />

      {/* News Section */}
      <Blog />

      {/* Contact Form Section */}
      <Contact />
    </div>
  );
}
