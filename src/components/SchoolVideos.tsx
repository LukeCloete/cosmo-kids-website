import Image from "next/image";
import AVATAR_IMAGE from "../../public/cosmo-kids-instagram-avatar.png";
import GIRAFFE_IMAGE from "../../public/jolly-giraffe.webp";
import MOUSE_IMAGE from "../../public/wise-mice.webp";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/cosmo_kids_nam/";
const INSTAGRAM_USERNAME = "cosmo_kids_nam";

// The hero buttons link to these ids, so keep them in sync with Hero.tsx.
// Each mascot is offset so its head peeks over the top edge of the video.
const schools = [
  {
    id: "junior-school",
    name: "Junior School",
    reelUrl: "https://www.instagram.com/reel/DZUNqy5sAUt/",
    background: "from-yellow-100 to-yellow-300",
    mascot: GIRAFFE_IMAGE,
    mascotPosition: "right-4 -top-16 w-24",
  },
  {
    id: "senior-school",
    name: "Senior School",
    reelUrl: "https://www.instagram.com/reel/DZCiIGKAtIQ/",
    background: "from-blue-100 to-blue-300",
    mascot: MOUSE_IMAGE,
    mascotPosition: "-right-1 -top-[88px] w-32",
  },
];

export default function SchoolVideos() {
  return (
    <section
      id="sneak-peek"
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-orange-400 text-xl">Sneak Peek</p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Step Inside <span className="text-orange-500">Cosmo Kids</span>
          </h2>
          <p className="text-xl text-gray-600">
            See what a day looks like in our Junior and Senior School
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {schools.map((school) => (
            <div
              key={school.id}
              id={school.id}
              className={`scroll-mt-28 bg-gradient-to-br ${school.background} rounded-2xl shadow-xl p-4 sm:p-6`}
            >
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                {school.name}
              </h3>

              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mb-3 w-max hover:opacity-80"
              >
                <Image
                  src={AVATAR_IMAGE}
                  alt="Cosmo Kids"
                  className="w-10 h-10 rounded-full bg-white p-0.5 ring-2 ring-white shadow"
                />
                <span className="font-semibold text-gray-800">
                  {INSTAGRAM_USERNAME}
                </span>
              </a>

              <div className="relative">
                <Image
                  src={school.mascot}
                  alt=""
                  sizes="128px"
                  className={`absolute ${school.mascotPosition} h-auto opacity-40 pointer-events-none select-none`}
                />

                {/* Instagram's embed can't be restyled, so it is cropped to just
                    the 16:9 video: the iframe is pulled up past its 54px header
                    and everything below the video is clipped by the wrapper */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-white/60 shadow-lg">
                  <iframe
                    src={`${school.reelUrl}embed/`}
                    title={`${school.name} video`}
                    loading="lazy"
                    scrolling="no"
                    allow="autoplay; encrypted-media; fullscreen"
                    className="absolute left-0 top-[-54px] w-full h-[calc(100%+254px)] border-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
