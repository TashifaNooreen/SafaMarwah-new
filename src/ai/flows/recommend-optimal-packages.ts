'use server';

/**
 * @fileOverview A flow that recommends optimal Umrah/Hajj packages based on user preferences.
 *
 * - recommendOptimalPackages - A function that recommends packages based on user preferences.
 * - RecommendOptimalPackagesInput - The input type for the recommendOptimalPackages function.
 * - RecommendOptimalPackagesOutput - The return type for the recommendOptimalPackages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendOptimalPackagesInputSchema = z.object({
  priceRange: z
    .string()
    .describe('The preferred price range for the package in INR (e.g., "₹75,000-₹1,50,000").'),
  airlinePreference: z
    .string()
    .describe('The preferred airline for the package (e.g., "Emirates", "Saudi Airlines", or "Any").'),
  ziyaratGuideAvailability: z
    .boolean()
    .describe('Whether a ziyarat guide is required (true) or not (false).'),
  departureLocation: z
    .string()
    .describe('The preferred departure location (e.g., "JFK", "LHR", or "Any").'),
  duration: z
    .string()
    .describe('The preferred duration of the package in days (e.g., "7-10", "10-14", or "Any").'),
  foodPreference: z
    .string()
    .describe('The preferred food preference (e.g., "Vegetarian", "Non-Vegetarian", or "Any").'),
  distanceFromHaram: z
    .string()
    .describe('The preferred distance from Masjid al-Haram (e.g., "0-500m", "500m-1km", or "Any").'),
  userPrompt: z.string().optional().describe("The user's raw text prompt, e.g. 'I want a cheap package for 10 days'"),
});

export type RecommendOptimalPackagesInput = z.infer<
  typeof RecommendOptimalPackagesInputSchema
>;

const PackageSchema = z.object({
  packageName: z.string(),
  price: z.number(),
  duration: z.string(),
  airline: z.string(),
  ziyaratGuide: z.boolean(),
  departureLocation: z.string(),
  food: z.string(),
  distanceFromHaram: z.string(),
});

const RecommendOptimalPackagesOutputSchema = z.array(PackageSchema).describe('An array of recommended packages.');

export type RecommendOptimalPackagesOutput = z.infer<
  typeof RecommendOptimalPackagesOutputSchema
>;

export async function recommendOptimalPackages(
  input: RecommendOptimalPackagesInput
): Promise<RecommendOptimalPackagesOutput> {
  return recommendOptimalPackagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendOptimalPackagesPrompt',
  input: {schema: RecommendOptimalPackagesInputSchema},
  output: {schema: RecommendOptimalPackagesOutputSchema},
  prompt: `You are a travel expert specializing in Umrah and Hajj packages. A user will provide their preferences in a text prompt. Your job is to understand their request and recommend the 3 best packages.

User's request:
"{{{userPrompt}}}"

Infer their preferences from the prompt. If a preference is not mentioned, you can make a reasonable assumption or choose the most common option.

Here are the user preferences you should try to determine:
Price Range: {{{priceRange}}}
Airline Preference: {{{airlinePreference}}}
Ziyarat Guide Availability: {{{ziyaratGuideAvailability}}}
Departure Location: {{{departureLocation}}}
Duration: {{{duration}}}
Food Preference: {{{foodPreference}}}
Distance from Masjid al-Haram: {{{distanceFromHaram}}}

Based on your analysis of the user's prompt, return a JSON array of the top 3 packages that best match their needs. The price should be in INR. Each package should include packageName, price, duration, airline, ziyaratGuide, departureLocation, food, and distanceFromHaram.

Return ONLY a valid JSON array. Do not include any other text in your response.
`,
});

const recommendOptimalPackagesFlow = ai.defineFlow(
  {
    name: 'recommendOptimalPackagesFlow',
    inputSchema: RecommendOptimalPackagesInputSchema,
    outputSchema: RecommendOptimalPackagesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
