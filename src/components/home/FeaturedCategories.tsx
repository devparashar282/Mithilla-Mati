import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Raw Makhana", image: "/Plain Prasadam.png", link: "/products" },
  { name: "Roasted Spices", image: "/Tandoori Spices.png", link: "/products" },
  { name: "Sweet Glazed", image: "/Caramel.png", link: "/products" },
  { name: "Premium Gift Packs", image: "/Coastal Spices.png", link: "/products" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 bg-ivory relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'2\' fill=\'%23E07A5F\'/%3E%3Cpath d=\'M20 0 L40 20 L20 40 L0 20 Z\' fill=\'none\' stroke=\'%238B1E3F\' stroke-width=\'0.5\'/%3E%3C/svg%3E')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-indigo mb-6 tracking-wide">
            Explore <span className="text-terracotta">Collections</span>
          </h2>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-12 h-1 bg-haldi"></div>
            <div className="w-4 h-4 bg-terracotta transform rotate-45"></div>
            <div className="w-12 h-1 bg-haldi"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="group block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-white">
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-maroon/5 group-hover:bg-maroon/10 transition-colors"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-playfair text-xl font-bold text-ivory text-center">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
