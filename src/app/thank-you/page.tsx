"use client";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Thank You!</h1>
        <p className="text-lg text-gray-600">Your submission has been received.</p>
        <Link href="/">
          <p className="text-sky-600 hover:text-sky-700">Go back to Home</p>
        </Link>
      </div>
    </div>
  );
}
