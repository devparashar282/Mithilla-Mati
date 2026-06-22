import Image from "next/image";
import { Camera } from "lucide-react";

export default function InstagramGallery() {
  const images = [
    "/Feirly Peri Peri.png",
    "/slider 2.png",
    "/slider 3.png",
    "/Himalyan Pink salt.png",
    "/Plain Prasadam.png",
  ];

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 flex flex-col items-center">
          <Camera size={40} className="text-mustard mb-4" />
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-maroon mb-4">Join the MITHILA MAATI Family</h2>
          <p className="text-gray-600 mb-6">Tag us @MithilaMaati to be featured on our heritage wall.</p>
          <div className="w-24 h-1 bg-mustard mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
          {images.map((src, index) => (
            <div key={index} className="relative aspect-square overflow-hidden group cursor-pointer">
              <Image 
                src={src} 
                alt={`Instagram gallery ${index + 1}`} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={32} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
