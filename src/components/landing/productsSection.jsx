import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";
import { VscCircleLargeFilled } from "react-icons/vsc";
import Title from "@components/common/title";
import Description from "@components/common/description";

const ProductsButton = ({ number_of_products, cta }) => {
  return (
    <Link
      href={cta.href}
      className="px-2 flex items-center gap-2 text-sm text-white rounded-full backdrop-blur-md shadow-md bg-white/10 border border-white/10"
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
  },
  isFirst,
}) => {
  return (
    <div
      className={`w-full h-72 ${
        isFirst ? "sm:flex-grow-[1.2] lg:flex-grow-[2]" : "sm:flex-grow"
      } relative flex flex-col items-center gap-2 sm:w-min sm:h-full sm:flex-1`}
    >
      <Image
        src={thumbnail}
        alt={title}
        width={512}
        height={512}
        className="w-full h-full rounded-lg object-cover brightness-75"
      />
      <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col gap-4 justify-between items-start">
        <div className="flex flex-col items-start gap-4">
          <div className="w-full flex justify-between items-center gap-2">
            <h1 className="text-lg text-white sm:text-2xl xl:text-2xl">
              {title}
            </h1>
            {highlight && (
              <Link href={highlight.href}>
                <MdOutlineArrowOutward className="w-8 h-8 m-[0.1rem] p-1 bg-white text-sm text-black rounded-full sm:text-base sm:w-10 sm:h-10 sm:p-2 xl:w-16 xl:h-16 xl:p-4" />
              </Link>
            )}
          </div>
          <p className="text-sm text-white xl:text-lg">{description}</p>
        </div>
        <ProductsButton number_of_products={number_of_products} cta={cta} />
      </div>
    </div>
  );
};
const ProductsScroll = ({ products }) => {
  return (
    <ul className="w-full flex gap-6 text-lg overflow-x-auto scrollbar-hide sm:text-2xl">
      {products.map((product, index) => (
        <li key={index} className="flex justify-between items-center gap-6">
          <VscCircleLargeFilled size={16} className="text-yellow-400" />
          <span className="text-nowrap">{product.text}</span>
        </li>
      ))}
    </ul>
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
      className="h-max p-8 flex flex-col justify-center items-center gap-6 bg-white text-black sm:py-16"
    >
      <div className="flex flex-col items-start gap-2 sm:px-6">
        <Title title={title} />
        <Description description={description} className="text-left w-2/3" />
      </div>
      <div className="w-full flex flex-col justify-between items-center gap-2 sm:h-80 sm:flex-row lg:h-96 lg:gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} isFirst={index === 0} />
        ))}
      </div>
      <ProductsScroll products={productsScroll} />
    </section>
  );
}
