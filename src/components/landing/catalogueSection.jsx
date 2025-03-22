import { Heading } from "@components/common/text";

export default function CatalogueSection() {
  const catalogues = [
    {
      cover: "/pdfs/imgs/catalogue_face1.png",
      pdf: "/pdfs/catalogue.pdf",
      title: "Catalogue"
    },
    {
      cover: "/pdfs/imgs/E_catalog_face1.png",
      pdf: "/pdfs/E-catalog.pdf",
      title: "E-catalog"
    },
    {
      cover: "/pdfs/imgs/I40_I60_Linear_catalogue_face1.png", 
      pdf: "/pdfs/I40_I60_Linear_catalogue.pdf",
      title: "I40 I60 Linear catalogue"
    },
    {
      cover: "/pdfs/imgs/LM_Media_Facade2023_face1.png",
      pdf: "/pdfs/LM_Media_Facade2023.pdf",
      title: "LM Media Facade2023"
    },
    {
      cover: "/pdfs/imgs/MAGNETIC_TRACK_2023_face1.png",
      pdf: "/pdfs/MAGNETIC_TRACK_2023.pdf",
      title: "MAGNETIC TRACK 2023"
    }
  ];

  return (
    <section
      id="catalogue"
      className="h-max p-8 flex flex-col justify-center items-start gap-6 text-black sm:px-16 sm:py-16 lg:px-20"
    >
      <div className="flex flex-col gap-2">
        <Heading 
          title="LYTE MASTER" 
          variant="2xl" 
          className="font-light opacity-75"
        />
        <Heading
          title="CATALOGUES AND BROCHURES"
          variant="base"
          className="font-bold text-3x1"
        />
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {catalogues.map((catalogue, i) => (
          <a
            key={i}
            href={catalogue.pdf}
            download
            className="group relative w-full aspect-square bg-cover bg-center rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundImage: `url(${catalogue.cover})` }}
          >
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-black/30 flex items-end p-4 hover:bg-black/40 transition-colors">
              <div className="text-white">
                <h3 className="text-lg font-semibold">{catalogue.title}</h3>
                <p className="text-sm opacity-80">Lytemaster®</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}