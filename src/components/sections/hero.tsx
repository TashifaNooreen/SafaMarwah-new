'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');

  return (
    <section className="relative w-full">
      <div className="absolute inset-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Hero background image of a holy site in Mecca"
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
      </div>
      <div className="relative z-10 container flex min-h-[70vh] items-center justify-center">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your Sacred Journey, Simplified
          </h1>
          <p className="mt-6 text-lg text-foreground/80 md:text-xl">
            Find, compare, and book the perfect Umrah and Hajj package with complete transparency and ease.
          </p>
          <div className="mt-8">
            <Link href="#packages">
              <Button
                size="lg"
                className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg shadow-lg transition-transform hover:scale-105"
              >
                Find Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
