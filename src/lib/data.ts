import type { Package, Testimonial } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (!img) {
    return { imageUrl: '', imageHint: '' };
  }
  return { imageUrl: img.imageUrl, imageHint: img.imageHint };
}

export const featuredPackages: Package[] = [
  {
    id: 'fp_001',
    packageName: 'Economy Umrah Package',
    price: 96000,
    duration: '10 days',
    airline: 'Saudi Airlines',
    ziyaratGuide: true,
    departureLocation: 'JFK',
    food: 'Included',
    distanceFromHaram: '1-2km',
    ...findImage('package-1'),
  },
  {
    id: 'fp_002',
    packageName: '5-Star Umrah Experience',
    price: 280000,
    duration: '7 days',
    airline: 'Emirates',
    ziyaratGuide: true,
    departureLocation: 'LHR',
    food: 'Breakfast Only',
    distanceFromHaram: '0-500m',
    ...findImage('package-2'),
  },
  {
    id: 'fp_003',
    packageName: 'Family Umrah Deal',
    price: 120000,
    duration: '14 days',
    airline: 'Qatar Airways',
    ziyaratGuide: false,
    departureLocation: 'DXB',
    food: 'Full Board',
    distanceFromHaram: '500m-1km',
    ...findImage('package-3'),
  },
  {
    id: 'fp_004',
    packageName: 'Short & Sweet Umrah',
    price: 76000,
    duration: '5 days',
    airline: 'Turkish Airlines',
    ziyaratGuide: false,
    departureLocation: 'IST',
    food: 'Not Included',
    distanceFromHaram: '1-2km',
    ...findImage('package-4'),
  },
  {
    id: 'fp_005',
    packageName: 'All-Inclusive Luxury',
    price: 336000,
    duration: '12 days',
    airline: 'Etihad',
    ziyaratGuide: true,
    departureLocation: 'SYD',
    food: 'Full Board',
    distanceFromHaram: '0-500m',
    ...findImage('package-5'),
  },
  {
    id: 'fp_006',
    packageName: 'Spiritual Journey',
    price: 176000,
    duration: '15 days',
    airline: 'Saudi Airlines',
    ziyaratGuide: true,
    departureLocation: 'JFK',
    food: 'Included',
    distanceFromHaram: '500m-1km',
    ...findImage('package-6'),
  },
  {
    id: 'fp_007',
    packageName: 'Ramadan Special',
    price: 224000,
    duration: '10 days',
    airline: 'Emirates',
    ziyaratGuide: true,
    departureLocation: 'MAN',
    food: 'Iftar & Suhoor',
    distanceFromHaram: '0-500m',
    ...findImage('package-7'),
  },
  {
    id: 'fp_008',
    packageName: 'Budget Friendly Hajj',
    price: 480000,
    duration: '21 days',
    airline: 'FlyNas',
    ziyaratGuide: false,
    departureLocation: 'KHI',
    food: 'Included',
    distanceFromHaram: '2-3km',
    ...findImage('package-8'),
  },
];

export const testimonials: Testimonial[] = [
    {
        id: 't_001',
        name: 'Ahmed Khan',
        title: 'Pilgrim',
        quote: 'Using Umrah Compare made finding the right package so simple. The transparency in pricing and features is exactly what I needed. Highly recommended!',
        ...findImage('testimonial-1'),
        avatarUrl: findImage('testimonial-1').imageUrl,
        avatarHint: findImage('testimonial-1').imageHint,

    },
    {
        id: 't_002',
        name: 'Fatima Al-Jamil',
        title: 'First-time Umrah Performer',
        quote: 'As a first-timer, I was overwhelmed. This platform helped me compare different options side-by-side, and I found a package that felt safe and comfortable.',
        ...findImage('testimonial-2'),
        avatarUrl: findImage('testimonial-2').imageUrl,
        avatarHint: findImage('testimonial-2').imageHint,
    },
    {
        id: 't_003',
        name: 'Yusuf Ibrahim',
        title: 'Travel Agent',
        quote: 'An excellent tool for both individuals and families. The filtering options are robust, and the AI recommendations are surprisingly accurate. A game-changer.',
        ...findImage('testimonial-3'),
        avatarUrl: findImage('testimonial-3').imageUrl,
        avatarHint: findImage('testimonial-3').imageHint,
    }
]
