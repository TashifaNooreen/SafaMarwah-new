'use server';

import {
  recommendOptimalPackages,
  type RecommendOptimalPackagesInput,
  type RecommendOptimalPackagesOutput,
} from '@/ai/flows/recommend-optimal-packages';
import { z } from 'zod';

const RecommendOptimalPackagesInputSchema = z.object({
  priceRange: z.string().min(1, { message: 'Price range is required.' }),
  airlinePreference: z.string().min(1, { message: 'Airline preference is required.' }),
  ziyaratGuideAvailability: z.boolean(),
  departureLocation: z.string().min(1, { message: 'Departure location is required.' }),
  duration: z.string().min(1, { message: 'Duration is required.' }),
  foodPreference: z.string().min(1, { message: 'Food preference is required.' }),
  distanceFromHaram: z.string().min(1, { message: 'Distance from Haram is required.' }),
});

export async function getRecommendedPackages(
  input: RecommendOptimalPackagesInput
): Promise<{ success: true; data: RecommendOptimalPackagesOutput } | { success: false; error: string }> {
  const parsedInput = RecommendOptimalPackagesInputSchema.safeParse(input);

  if (!parsedInput.success) {
    const errorMessages = parsedInput.error.errors.map(e => e.message).join(' ');
    return { success: false, error: errorMessages || 'Invalid input.' };
  }

  try {
    const packages = await recommendOptimalPackages(parsedInput.data);
    // Add unique IDs and placeholder images to AI results for consistency
    const packagesWithIds = packages.map((pkg, index) => ({
      ...pkg,
      id: `ai_${Date.now()}_${index}`,
      imageUrl: `https://picsum.photos/seed/ai${index}/600/400`,
      imageHint: 'hotel travel',
    }));
    return { success: true, data: packagesWithIds };
  } catch (error) {
    console.error('AI recommendation error:', error);
    return { success: false, error: 'Failed to get recommendations. Please try again later.' };
  }
}
