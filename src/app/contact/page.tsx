import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-sky-200 to-sky-100 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-60"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-60"></div>
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-purple-300 rounded-full opacity-60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Contact <span className="text-orange-500">Us</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      32 General Murtala Muhammed Rd
                      <br />
                      Windhoek
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Phone
                    </h3>
                    <Link href="tel:0814077677">
                      <p className="text-gray-600 hover:text-orange-500">
                        081 407 7677
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Email
                    </h3>
                    <Link href="mailto:michelle@cosmokids.com.na">
                      <p className="text-gray-600 hover:text-orange-500">
                        michelle@cosmokids.com.na
                      </p>
                    </Link>
                    <Link href="mailto:jodi@cosmokids.com.na">
                      <p className="text-gray-600 hover:text-orange-500">
                        jodi@cosmokids.com.na
                      </p>
                    </Link>
                    <Link href="mailto:admissions@cosmokids.com.na">
                      <p className="text-gray-600 hover:text-orange-500">
                        admissions@cosmokids.com.na
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Find Us</h2>
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d662.5291799082945!2d17.088365737736904!3d-22.54623365604912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c0b1ca7f725c2db%3A0xe216d0d23201b0fe!2sCosmoKids!5e1!3m2!1sen!2sna!4v1770208658247!5m2!1sen!2sna"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cosmo Kids Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
