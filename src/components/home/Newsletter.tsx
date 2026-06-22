import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 relative bg-maroon text-ivory overflow-hidden border-t-8 border-mustard">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4A017\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Mail size={48} className="mx-auto text-mustard mb-6" />
        <h2 className="font-playfair text-4xl font-bold mb-4">Join the MITHILA MAATI Family</h2>
        <p className="font-sans text-lg text-ivory/80 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and receive updates on new products, exclusive offers, and the latest stories from the heart of Mithila.
        </p>

        <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-6 py-4 rounded bg-ivory text-dark-text outline-none focus:ring-2 focus:ring-mustard font-sans"
            required
          />
          <button 
            type="submit" 
            className="px-8 py-4 bg-mustard text-dark-text font-bold rounded hover:bg-ivory hover:text-maroon transition-colors shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
