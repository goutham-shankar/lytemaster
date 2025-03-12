import Image from "next/image";
import { newsPageData } from "@assets/placeholders";
import { HiOutlineArrowRight } from "react-icons/hi";

// Breadcrumbs Component
const Breadcrumbs = () => {
  return (
    <div className="flex items-center text-black text-sm sm:text-base xl:text-lg 2xl:text-xl">
      <a href="/" className="hover:text-gray-500 mr-2">
        Home
      </a>
      <span className="font-bold">/</span>
      <span className="whitespace-pre"> News</span>
    </div>
  );
};

// NewsCard Component
const NewsCard = ({ thumbnail, title, description, date, href }) => {
  return (
    <a
      href={href}
      className="flex flex-col justify-evenly items-start gap-2 2xl:gap-4"
    >
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={400}
        height={200}
        className="w-full h-28 rounded-xl sm:h-44 2xl:h-72"
      />
      <h2 className="mt-2 text-base font-bold lg:text-lg xl:text-xl 2xl:text-2xl">
        {title}
      </h2>
      <p className="text-xs text-gray-700 lg:text-sm xl:text-base 2xl:text-lg">
        {description}
      </p>
      <p className="mt-1 text-xs text-gray-600 lg:text-sm xl:text-base 2xl:text-lg">
        {date}
      </p>
    </a>
  );
};

// NewsGrid Component (gap increased here)
const NewsGrid = ({ news }) => {
  return (
    <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-12">
      {news.map((item, index) => (
        <NewsCard key={index} {...item} />
      ))}
    </div>
  );
};

// FeaturedNewsCard Component
const FeaturedNewsCard = ({ thumbnail, title, description, href }) => {
  return (
    <div className="w-full h-[24rem] my-6 relative flex flex-col justify-end items-start gap-3 sm:h-[28rem] 2xl:h-[40rem]">
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={400}
        height={200}
        className="object-cover absolute w-full h-full rounded-xl"
      />
      <div className="w-full p-4 flex flex-col justify-evenly items-start gap-3 z-10 sm:p-8 lg:w-3/5 2xl:p-12 2xl:gap-6">
        <div className="px-4 text-xs bg-white rounded-full flex items-center justify-center sm:text-sm 2xl:px-6 2xl:text-base">
          FEATURED
        </div>
        <h2 className="text-xl text-white font-bold sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
          {title}{" "}
          <a href={href} className="mx-2 text-white font-bold">
            <HiOutlineArrowRight size={20} className="inline-block" />
          </a>
        </h2>
        <p className="w-10/12 text-xs text-gray-100 sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
          {description}
        </p>
      </div>
    </div>
  );
};

// Main NewsPage Component
export default function NewsPage() {
  return (
    <div className="h-max my-12 p-6 flex flex-col justify-center items-start gap-4 sm:my-16 sm:px-12 2xl:my-32 2xl:gap-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl 2xl:text-5xl">
        News
      </h1>
      <FeaturedNewsCard {...newsPageData.featured} />
      <NewsGrid news={newsPageData.news} />
    </div>
  );
}
