import { collection, getDocsFromServer, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface Class {
  id: string;
  ageRange: string;
  classname: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  funActivities: {lucideIcon: string, title: string, description: string}[];
  dailyLife: {lucideIcon: string, title: string, description: string}[];
}

// URL segment for a class, e.g. "Jolly Giraffes" -> "jolly-giraffes"
export const toClassSlug = (classname: string) =>
  classname.toLowerCase().replace(/\s+/g, "-");

export const getClasses = async (): Promise<Class[]> => {
  const classesCollection = collection(db, "classes");
  const q = query(classesCollection, orderBy("ageRange"));
  const classesSnapshot = await getDocsFromServer(q);
  const classesList = classesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Class[];
  return classesList;
};
