import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {

  return (
    <section className="relative w-full">
      <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1583911269209-a7c366e51137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtZWN8ZW58MHx8fHwxNzU5Mzc0MTA5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero background image of a holy site in Mecca"
            data-ai-hint="mecca pilgrimage"
            fill
            className="object-cover"
            priority
          />
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
