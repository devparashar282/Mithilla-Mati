import Image from "next/image";
import Link from "next/link";

export default function StoryPage() {
  return (
    <main className="flex min-h-screen flex-col bg-ivory text-dark-text pt-[88px]">
      
      {/* Hero Banner */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-maroon">
        <Image 
          src="/slide_art.png" 
          alt="Mithila Maati Heritage" 
          fill 
          className="object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-mustard mb-6 drop-shadow-lg">
            From the Ponds of Mithila to Your Bowl
          </h1>
          <p className="font-sans text-xl md:text-2xl text-ivory drop-shadow">
            The Story Behind Every Mithila Maati Pack
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans text-lg leading-relaxed text-dark-text/90">
        
        <div className="mb-16">
          <p className="mb-6 first-letter:text-6xl first-letter:font-playfair first-letter:text-maroon first-letter:float-left first-letter:mr-3 first-letter:mt-2">
            Before sunrise, while most of the world is still asleep, a farmer in the wetlands of Mithila is already waist-deep in cold water. The pond is dark, the air sharp with chill — yet he wades in, because the makhana seeds buried in the muddy bottom won't wait for the sun. This isn't a job he clocks into. It's a rhythm his father followed, and his grandfather before him, carried by the Mallah and Sahni families who have farmed these waters for generations.
          </p>
        </div>

        <div className="my-16 rounded-xl shadow-lg border border-maroon/10 hover:shadow-xl transition-shadow overflow-hidden">
          {/* Replace with your Mithila Maati Makhana Map image */}
          <Image src="/story 1.jpeg" alt="Mithila Maati Map" width={1200} height={800} className="w-full h-auto" />
        </div>

        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-maroon mb-6">A Harvest That Demands Everything</h2>
          <p className="mb-6">
            Makhana farming is unlike any other harvest in India. Seeds are pulled by hand from beneath ponds, often by farmers diving dozens of times a day, skin pruned from hours in icy water. What they bring up isn't ready to eat — it must be dried, sun-cured, and then roasted in an iron pan over open flame at over 250°C, popped one batch at a time with bare hands fast enough to avoid blisters, precise enough not to burn the harvest. It takes years to learn the exact second a seed is ready to crack into that soft, pearl-white puff.
          </p>
          <p className="font-medium text-maroon italic">
            And after all of it — the cold ponds, the burnt fingertips, the smoke-filled evenings — the same farmers who make the harvest often see the least of what it's worth.
          </p>
        </div>

        <div className="my-16 rounded-xl shadow-lg border border-maroon/10 hover:shadow-xl transition-shadow overflow-hidden">
          {/* Replace with your Farm To Table image */}
          <Image src="/story 2.jpeg" alt="Farm to Table Sourcing Promise" width={1200} height={800} className="w-full h-auto" />
        </div>

        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-maroon mb-6">Where Mithila Maati Begins</h2>
          <p className="mb-6">
            We didn't start this brand in a boardroom. We started at the edge of those ponds, asking: if this snack is called premium, shouldn't the people who make it be treated that way too?
          </p>
          <p className="mb-8">
            <strong className="text-maroon">Maati means soil</strong> — the ground that has fed and shaped Mithila for centuries. That's why we promise:
          </p>
          
          <ul className="space-y-6 mb-8">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mustard flex items-center justify-center text-maroon font-bold mr-4 mt-1">1</div>
              <div>
                <h3 className="font-bold text-xl text-dark-text">Fair, direct sourcing</h3>
                <p>Working closely with farming communities, cutting out layers of middlemen.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mustard flex items-center justify-center text-maroon font-bold mr-4 mt-1">2</div>
              <div>
                <h3 className="font-bold text-xl text-dark-text">Honoring the craft</h3>
                <p>Every batch hand-roasted using time-tested, generations-old skill.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mustard flex items-center justify-center text-maroon font-bold mr-4 mt-1">3</div>
              <div>
                <h3 className="font-bold text-xl text-dark-text">Investing back into the source</h3>
                <p>Channeling our growth into better tools and stability for farming families.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="rounded-xl shadow-lg border border-maroon/10 hover:shadow-xl transition-shadow overflow-hidden">
            <Image src="/story 3.jpeg" alt="GI Tag Promise" width={800} height={600} className="w-full h-auto" />
          </div>
          <div className="rounded-xl shadow-lg border border-maroon/10 hover:shadow-xl transition-shadow overflow-hidden">
            <Image src="/story 4.jpeg" alt="Health Benefits" width={800} height={600} className="w-full h-auto" />
          </div>
        </div>

        {/* Infographic 5: What Our Customers Say */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-maroon mb-6 text-center">What Our Customers Say</h2>
          <div className="rounded-xl shadow-lg border border-maroon/10 hover:shadow-xl transition-shadow w-full max-w-4xl mx-auto overflow-hidden">
            {/* Replace with your Customer Reviews image */}
            <Image src="/story 5.jpeg" alt="What Our Customers Say" width={1200} height={800} className="w-full h-auto" />
          </div>
        </div>

        <div className="mb-16 bg-maroon/5 p-8 md:p-12 rounded-2xl border border-maroon/20 text-center">
          <h2 className="font-playfair text-3xl font-bold text-maroon mb-6">A Bowl With a Story In It</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            When you open a pack of Mithila Maati, you're holding the result of a 4 a.m. pond, work-worn hands, and a flame tended for generations. You're tasting a piece of Mithila itself.
          </p>
          <p className="mb-6 max-w-2xl mx-auto font-medium">
            We can't fix everything overnight. But as long as Mithila Maati exists, the hands that grow our makhana will never be invisible.
          </p>
          <p className="font-playfair text-2xl text-mustard italic mb-8">
            Thank you for choosing a bowl that gives back to the hands that filled it.
          </p>
          <p className="font-bold text-maroon uppercase tracking-widest">— Team Mithila Maati</p>
          
          <div className="mt-10">
            <Link href="/products" className="inline-block px-8 py-4 bg-maroon text-ivory rounded font-medium hover:bg-mustard hover:text-dark-text transition-colors shadow-lg">
              Explore Our Products
            </Link>
          </div>
        </div>

      </section>
      
    </main>
  );
}
