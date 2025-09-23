import { app, db } from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export interface FirebaseGalleryImage {
  title: string;
  category: string;
  id: string;
  url: string;
  alt: string;
}

export const getGalleryImages = async (): Promise<FirebaseGalleryImage[]> => {
  try {
    const galleryCollection = collection(db, "gallery");
    const q = query(galleryCollection);
    const gallerySnapshot = await getDocs(q);
    const galleryList = gallerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<FirebaseGalleryImage, "id">),
    }));

    return galleryList;
  } catch (error) {
    console.error("Error fetching gallery images: ", error);
    return [];
  }
};

interface Filters {
  tags?: string[];
  searchTerm?: string;
}

interface Article {
  id: string;
  title: string;
  // You can add other fields that your articles have
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  description: string;
  category: string;
  date: string; // Consider using Date type if you need date manipulation
  // readTime: string;
  imageUrl: string;
  // featured: boolean;
  author: string;
}

export const getNewsArticles = async (): Promise<NewsArticle[]> => {
  try {
    const newsCollection = collection(db, "news-events");
    const q = query(newsCollection, orderBy("date", "desc")); // Order by date descending
    const newsSnapshot = await getDocs(q);
    const newsList = newsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as Omit<NewsArticle, "id">),
      };
    });
    return newsList;
  } catch (error) {
    console.error("Error fetching news articles: ", error);
    return [];
  }
};

export const getNewsArticleBySlug = async (
  slug: string
): Promise<NewsArticle | null> => {
  try {
    const allArticles = await getNewsArticles(); // Fetch all articles
    const foundArticle = allArticles.find(
      (article) => article.title.toLowerCase().replace(/\s+/g, "-") === slug
    );
    return foundArticle || null;
  } catch (error) {
    console.error(`Error fetching news article with slug ${slug}: `, error);
    return null;
  }
};

export const getFilteredData = async (filters: Filters) => {
  try {
    const db = getFirestore(app);

    const dataCollection = collection(db, "articles");

    let q = query(dataCollection);

    if (filters.tags && filters.tags.length > 0) {
      q = query(q, where("tags", "array-contains-any", filters.tags));
    }

    const dataSnapshot = await getDocs(q);
    let dataList: Article[] = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Article, "id">),
    }));

    if (filters.searchTerm) {
      dataList = dataList.filter((item: Article) =>
        item.title?.toLowerCase().includes(filters.searchTerm!.toLowerCase())
      );
    }

    return dataList;
  } catch (error) {
    console.error("Error fetching filtered data: ", error);
    return [];
  }
};
