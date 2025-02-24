import Image from 'next/image';

const products = [
        {
          title: "Commercial Lighting",
          description:
            "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit.",
          image: "/src/assets/bento_thumbnail_1.jpeg",
          count: 15,
        },
        {
          title: "Industrial Lighting",
          description:
            "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit.",
          image: "/assets/bento_thumbnail_2.jpeg",
          count: 15,
        },
        {
          title: "Landscape Lighting",
          description:
            "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit.",
          image: "/assets/bento_thumbnail_3.jpeg",
          count: 14,
        },
      ];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col mt-28">
      {/* Breadcrumb */}
      <div className=" p-4 text-sm">
        <div className="max-w-6xl mx-auto">HOME / PRODUCTS</div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-12">Our Products</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {products.map((product) => (
            <div key={product.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="text-sm font-medium text-gray-500">
                  {product.count} Products
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}