import { v4 as uuidv4 } from 'uuid';

export async function GET(request) {
  const products = [
    { 
      category_id: 1,
      slug: uuidv4(),
      title: "Commercial Lighting",
      description: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
      image: "/assets/products/commercial-lighting-thumbnail.jpeg",
    },
    {
      category_id: 2,
      slug: uuidv4(),
      title: "Industrial Lighting",
      description: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
      image: "/assets/products/industrial-lighting-thumbnail.jpeg",
    },
    {
      category_id: 3,
      slug: uuidv4(),
      title: "Landscape Lighting",
      description: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
      image:"/assets/products/landscape-lighting-thumbnail.jpeg",
    },
  ];

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

