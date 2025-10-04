'use server';

import {
  recommendOptimalPackages,
  type RecommendOptimalPackagesInput,
  type RecommendOptimalPackagesOutput,
} from '@/ai/flows/recommend-optimal-packages';
import { z } from 'zod';

const RecommendFromPromptInputSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required.' }),
});

export async function getRecommendedPackagesFromPrompt(
  input: { prompt: string }
): Promise<{ success: true; data: RecommendOptimalPackagesOutput } | { success: false; error: string }> {
  const parsedInput = RecommendFromPromptInputSchema.safeParse(input);

  if (!parsedInput.success) {
    const errorMessages = parsedInput.error.errors.map(e => e.message).join(' ');
    return { success: false, error: errorMessages || 'Invalid input.' };
  }
  
  // Create a fake structured input for the AI based on the prompt.
  // The AI will use the prompt to fill in the details.
  const aiInput: RecommendOptimalPackagesInput = {
    priceRange: '',
    airlinePreference: '',
    ziyaratGuideAvailability: false,
    departureLocation: '',
    duration: '',
    foodPreference: '',
    distanceFromHaram: '',
    userPrompt: parsedInput.data.prompt,
  };

  try {
    const packages = await recommendOptimalPackages(aiInput);
    // Add unique IDs and placeholder images to AI results for consistency
    const packagesWithIds = packages.map((pkg, index) => ({
      ...pkg,
      id: `ai_${Date.now()}_${index}`,
      imageUrl: `https://picsum.photos/seed/ai${index}/600/400`,
      imageHint: 'hotel travel',
    }));
    return { success: true, data: packagesWithIds.slice(0, 3) }; // Return top 3
  } catch (error) {
    console.error('AI recommendation error:', error);
    return { success: false, error: 'Failed to get recommendations. Please try again later.' };
  }
}