"use client";
import React from "react";
import { getClasses, Class } from "@/lib/classData";
import Image from "next/image";
import {
  Smile,
  Mic,
  MessageCircle,
  Paintbrush,
  Cpu,
  Puzzle,
} from "lucide-react";
import CTA from "@/components/CTA";
import { GalleryOverlay } from "@/components/GalleryOverlay";
import DynamicIcon from "@/components/DynamicIcon";

interface ClassPageProps {
  params: {
    id: string;
  };
}

const ClassPage: React.FC<ClassPageProps> = ({ params }) => {
  const { id } = params;
  const [classData, setClassData] = React.useState<Class | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // State for gallery
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  React.useEffect(() => {
    const fetchClass = async () => {
      try {
        setLoading(true);
        const classes = await getClasses();
        const foundClass = classes.find(
          (cls) => cls.classname.toLowerCase().replace(/\s+/g, "-") === id
        );
        if (foundClass) {
          setClassData(foundClass);
         
        } else {
          setError("Class not found.");
        }
      } catch (err) {
        setError("Failed to fetch class data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading class details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No class data available.
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
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
              Meet the{" "}
              <span className="text-orange-500">{classData.classname}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {classData.description}
            </p>
          </div>
        </div>
      </section>
      {/* Daily Life Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              A Day with the{" "}
              <span className="text-orange-500">{classData.classname}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src={classData.imageUrl}
                alt={classData.classname}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              
              {
                classData.dailyLife.map((lifeItem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      index % 3 === 0 ? "bg-blue-100" : index % 3 === 1 ? "bg-green-100" : "bg-purple-100"
                    }`}>
                      
                      <DynamicIcon name={lifeItem.lucideIcon} className={`w-6 h-6 ${
                        index % 3 === 0 ? "text-blue-600" : index % 3 === 1 ? "text-green-600" : "text-purple-600"
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {lifeItem.title}
                      </h3>
                      <p className="text-gray-600">
                        {lifeItem.description}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
      {/* Activities Section */}
      <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-orange-500">Fun Activities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our daily program is filled with activities that are both fun and
              educational, helping us grow and learn.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              classData.funActivities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-white  border-0 rounded-2xl overflow-hidden p-8 text-center space-y-4"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    index % 3 === 0 ? "bg-blue-500" : index % 3 === 1 ? "bg-green-500" : "bg-purple-500"
                  }`}>
                    <DynamicIcon name={activity.lucideIcon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600">
                    {activity.description}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              A Glimpse into Our{" "}
              <span className="text-orange-500">Classroom</span>
            </h2>
          </div>
          {classData.galleryImages && classData.galleryImages.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {classData.galleryImages && classData.galleryImages.map(
                (imageUrl: string, index: number) => (
                  <div
                    key={index}
                    className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                    onClick={() => openGallery(index)}
                  >
                    {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={`Classroom image ${index + 1}`}
                      width={600}
                      height={400}
                      className="transition-transform object-cover group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      <CTA p="Give your child the gift of loving care and structured learning in a safe and happy environment." />
      {classData.galleryImages && classData.galleryImages.length > 0 && (
        <GalleryOverlay
          images={classData.galleryImages.map(
            (imgUrl: string, index: number) => ({
              url: imgUrl,
              alt: `Classroom image ${index + 1}`,
            })
          )}
          initialIndex={selectedImageIndex}
          isOpen={galleryOpen}
          onClose={closeGallery}
        />
      )}
    </>
  );
};

export default ClassPage;
