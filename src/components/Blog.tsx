import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { getNewsArticles, NewsArticle } from "@/lib/data";

export default async function Blog() {
  const articles: NewsArticle[] = await getNewsArticles();
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Latest News + Events
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <Link key={article.id} href={`/news-and-events/${article.id}`}>
              <Card
                key={article.id}
                className="bg-white border-2 border-orange-300 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-video">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 overflow-ellipsis">
                    {article.description}
                  </p>
                  <p className="text-sm text-gray-500">{article.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Link href="/news-and-events">
        <Button className="mt-10 bg-orange-500 hover:bg-orange-600 font-semibold text-white mx-auto block rounded-full">
          View All News
        </Button>
      </Link>
    </section>
  );
}
