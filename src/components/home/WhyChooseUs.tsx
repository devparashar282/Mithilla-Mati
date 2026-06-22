import { Leaf, Droplet, HeartPulse, Award } from "lucide-react";

const features = [
  {
    icon: <Droplet size={40} className="text-mustard" />,
    title: "Farm Fresh",
    description: "Directly sourced from the sacred ponds and farmers of Mithila.",
  },
  {
    icon: <Leaf size={40} className="text-mustard" />,
    title: "100% Natural",
    description: "No artificial preservatives, flavors, or chemicals used.",
  },
  {
    icon: <HeartPulse size={40} className="text-mustard" />,
    title: "Rich in Nutrition",
    description: "High in protein, antioxidants, and essential minerals.",
  },
  {
    icon: <Award size={40} className="text-mustard" />,
    title: "Premium Quality",
    description: "Handpicked, graded, and carefully processed for perfection.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-maroon relative text-ivory">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4A017\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-4">Why Choose MITHILA MAATI</h2>
          <div className="w-24 h-1 bg-mustard mx-auto mb-6"></div>
          <p className="font-sans text-ivory/80 max-w-2xl mx-auto">
            We preserve the ancient traditions of Makhana harvesting while ensuring modern quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-ivory/5 backdrop-blur-sm border border-ivory/20 rounded-xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-maroon border-2 border-mustard rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                {feature.icon}
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3 text-mustard">{feature.title}</h3>
              <p className="text-ivory/80 font-sans leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
