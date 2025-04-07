import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { Heading, Paragraph } from "@components/common/text";

const ProductsButton = ({ number_of_products, cta }) => {
  return (
    <Link
      href={cta.href}
      className="min-w-min px-2 flex items-center gap-2 text-sm text-white text-nowrap rounded-full backdrop-blur-md shadow-md bg-white/10 border border-white/10 hover:scale-105 hover:bg-white/20 translate duration-500 ease-in-out"
    >
      <Image
        src={"/lightbulb.svg"}
        alt="lightbulb"
        width={24}
        height={24}
        className="w-12 p-2 inline-block invert"
      />
      {number_of_products} {number_of_products > 1 ? "Products" : "Product"}
    </Link>
  );
};

const ProductCard = ({
  product: {
    title,
    description,
    cta,
    thumbnail,
    number_of_products,
    highlight,
    link 
  },
  truncateLength = 500,
  isFirst,
}) => {
  isFirst = false;
  return (
    // <Link href = {"products/category?category_id=1"}>
    <div onClick={()=>{window.location.href = link}} className="group w-full h-72 sm:flex-grow hover:sm:flex-grow-[1.2] hover:lg:flex-grow-[1.5] grayscale hover:grayscale-0 relative flex flex-col items-center gap-2 sm:w-min sm:h-full sm:flex-1 transition-all duration-500 ease-in-out">

     

      <Image
        src={thumbnail}
        alt={title}
        width="auto"
        height="auto"
        className="w-full h-full rounded-lg object-cover brightness-75  hover:grayscale-0 transition-all duration-150 ease-in-out"
      />

      <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col gap-4 justify-between items-start">
        <div className="flex flex-col items-start gap-4">
          <div className="w-full flex justify-between items-center gap-2">
            <h1 className="text-lg text-white sm:text-2xl xl:text-2xl">
              {title}
            </h1>
            <Link href={highlight.href}>
              <MdOutlineArrowOutward className="w-8 h-8 m-[0.1rem] p-1 bg-white text-sm text-black rounded-full opacity-0 group-hover:opacity-100 sm:text-base sm:w-10 sm:h-10 sm:p-2 xl:w-16 xl:h-16 xl:p-4 transition-opacity duration-500 ease-in-out" />
            </Link>
          </div>
          <p className="h-24 text-sm text-white xl:text-lg overflow-hidden text-ellipsis lg:h-44 xl:h-64">
            {description.substr(0, truncateLength)}{" "}
            {description.length > truncateLength ? "..." : ""}
          </p>
        </div>
        {/* <ProductsButton number_of_products={number_of_products} cta={cta} /> */}
      </div>
    </div>
      
  );
};

const ProductsScroll = ({ products }) => {
  return (
    <div className="absolute -bottom-4 w-full flex gap-6 text-lg overflow-hidden scrollbar-hide sm:text-2xl md:-bottom-6 xl:-bottom-14  xl:text-3xl">
      <ul className="flex gap-6 animate-scroll whitespace-nowrap">
        {products.map((product, index) => (
          <li
            key={`product-${index}`}
            className="flex justify-between items-center gap-6"
          >
            <VscCircleLargeFilled size={16} className="text-yellow-400" />
            <span className="whitespace-nowrap">{product.text}</span>
          </li>
        ))}
      </ul>
      <ul className="flex gap-6 animate-scroll whitespace-nowrap">
        {products.map((product, index) => (
          <li
            key={`product-${index}`}
            className="flex justify-between items-center gap-6"
          >
            <VscCircleLargeFilled size={16} className="text-yellow-400" />
            <span className="whitespace-nowrap">{product.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ProductsSection({
  title,
  description,
  products,
  productsScroll,
}) {
  return (
    <section
      id="products"
      className="relative h-max p-8 flex flex-col justify-center items-center gap-6 text-black sm:px-16 sm:py-16 lg:px-20"
    >
      <div className="w-full flex flex-col items-start gap-2 mb-5">
        <Heading title={title} variant="2xl" className="mb-4" />
        <Paragraph description={description} className="text-left sm:w-2/3" />
      </div>
      <div className="w-full flex flex-col justify-between items-center gap-4 sm:h-80 sm:flex-row sm:gap-2 lg:h-96 lg:gap-4 xl:h-[32rem]">
        {products.map((product, index) => (
         
            <ProductCard key={index} product={product} isFirst={index === 0} />
         
        ))}
      </div>
      <ProductsScroll products={productsScroll} />
    </section>
  );
}
