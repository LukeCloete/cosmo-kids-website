"use client";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getNewsArticles, NewsArticle } from "@/lib/data";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import Newsletter from "@/components/Newsletter";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const allArticles = await getNewsArticles(); // Fetch all articles
        const foundArticle = allArticles.find(
          (article) => article.title.toLowerCase().replace(/\s+/g, "-") === slug
        );
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError("Article not found.");
        }
      } catch (err) {
        setError("Failed to fetch article data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const articleHtml = useMemo(() => {
    if (article && article.content) {
      try {
        // Parse the JSON string from the database
        let contentState = JSON.parse(article.content);
        console.log("Raw article.content:", article.content);
        // Convert the ContentState object to an HTML string
        const parsedContent = JSON.parse(article.content);
        console.log("Parsed content:", parsedContent);
        contentState = convertFromRaw(parsedContent);
        console.log("Generated articleHtml:", stateToHTML(contentState)); // Debugging
        return stateToHTML(contentState);
      } catch (e) {
        console.error("Error parsing or converting article content:", e);
        return `<p class="text-red-500">Error loading article content. Please check the content format in the database.</p>`;
      }
    }
    return "";
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading article...
      </div>
    );
  }

  // const rawContentState = convertToRaw(EditorState.getCurrentContent());

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No article data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <section className="relative bg-gradient-to-b from-sky-200 to-sky-100 pt-24 pb-16 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-60"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-60"></div>
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-purple-300 rounded-full opacity-60"></div>
        </div>

        {/* Clouds */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 283.5 21.2"
            className="w-full text-white fill-current"
          >
            <path d="M265.8 3.5c-10.9 0-15.9 6.2-15.9 6.2s-3.6-3.5-9.2-.9c-9.1 4.1-4.4 13.4-4.4 13.4s-1.2.2-1.9.9c-.6.7-.5 1.9-.5 1.9s-1-.5-2.3-.2c-1.3.3-1.6 1.4-1.6 1.4s.4-3.4-1.5-5c-3.9-3.4-8.3-.2-8.3-.2s-.6-.7-.9-.9c-.4-.2-1.2-.2-1.2-.2s-4.4-3.6-11.5-2.6-10.4 7.9-10.4 7.9-.5-3.3-3.9-4.9c-4.8-2.4-7.4 0-7.4 0s2.4-4.1-1.9-6.4-6.2 1.2-6.2 1.2-.9-.5-2.1-.5-2.3 1.1-2.3 1.1.1-.7-1.1-1.1c-1.2-.4-2 0-2 0s3.6-6.8-3.5-8.9c-6-1.8-7.9 2.6-8.4 4-.1-.3-.4-.7-.9-1.1-1-.7-1.3-.5-1.3-.5s1-4-1.7-5.2c-2.7-1.2-4.2 1.1-4.2 1.1s-3.1-1-5.7 1.4-2.1 5.5-2.1 5.5-.9 0-2.1.7-1.4 1.7-1.4 1.7-1.7-1.2-4.3-1.2c-2.6 0-4.5 1.2-4.5 1.2s-.7-1.5-2.8-2.4c-2.1-.9-4 0-4 0s2.6-5.9-4.7-9c-7.3-3.1-12.6 3.3-12.6 3.3s-.9 0-1.9.2c-.9.2-1.5.9-1.5.9S99.4 3 94.9 3.9c-4.5.9-5.7 5.7-5.7 5.7s-2.8-5-12.3-3.9-11.1 6-11.1 6-1.2-1.4-4-.7c-.8.2-1.3.5-1.8.9-.9-2.1-2.7-4.9-6.2-4.4-3.2.4-4 2.2-4 2.2s-.5-.7-1.2-.7h-1.4s-.5-.9-1.7-1.4-2.4 0-2.4 0-2.4-1.2-4.7 0-3.1 4.1-3.1 4.1-1.7-1.4-3.6-.7c-1.9.7-1.9 2.8-1.9 2.8s-.5-.5-1.7-.2c-1.2.2-1.4.7-1.4.7s-.7-2.3-2.8-2.8c-2.1-.5-4.3.2-4.3.2s-1.7-5-11.1-6c-3.8-.4-6.6.2-8.5 1v21.2h283.5V11.1c-.9.2-1.6.4-1.6.4s-5.2-8-16.1-8z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              {article.title}
            </h1>
            {/* <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {article.excerpt}
            </p> */}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Navigation */}
        <div className="bg-white border-b border-sky-100 mb-8">
          <Link href="/news-and-events">
            <Button
              variant="ghost"
              className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News & Events
            </Button>
          </Link>
        </div>

        {/* Featured Image */}
        {/* <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div> */}

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8 p-6 bg-white rounded-2xl shadow-sm">
          {/* <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={article.author.avatar || "/placeholder.svg"}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div> */}
          <div>
            <h3 className="font-semibold text-gray-800">{article.author}</h3>
            {/* <p className="text-gray-600 text-sm">{article.author.role}</p> */}
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12 mb-8">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />
        </div>

        {/* Newsletter Signup */}
        <Newsletter />
      </div>
    </div>
  );
}
