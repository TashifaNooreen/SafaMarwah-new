import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center gap-6 p-4 animate-in fade-in-0 slide-in-from-bottom-10 duration-500">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-shadow">
          Compare Umrah & Hajj Packages Easily
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-slate-200 text-shadow-sm">
          Find the perfect spiritual journey with our transparent and easy-to-use comparison tool.
        </p>
        <Link href="#packages">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-7 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
            Aao Madine Chale
          </Button>
        </Link>
      </div>
    </section>
  );
}
