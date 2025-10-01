'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getRecommendedPackages } from '@/app/actions';

import type { Package } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PackageCard } from '@/components/package-card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';


const formSchema = z.object({
  priceRange: z.string().default('₹75,000-₹1,50,000'),
  airlinePreference: z.string().default('Any'),
  ziyaratGuideAvailability: z.boolean().default(true),
  departureLocation: z.string().default('Any'),
  duration: z.string().default('7-10'),
  foodPreference: z.string().default('Any'),
  distanceFromHaram: z.string().default('0-500m'),
});

type FormValues = z.infer<typeof formSchema>;

interface PackageFinderProps {
  onCompareToggle: (pkg: Package, isSelected: boolean) => void;
  isPackageSelected: (pkgId: string) => boolean;
}

export function PackageFinder({ onCompareToggle, isPackageSelected }: PackageFinderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPackages, setRecommendedPackages] = useState<Package[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({}),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setRecommendedPackages([]);
    const result = await getRecommendedPackages(values);
    setIsLoading(false);

    if (result.success) {
      setRecommendedPackages(result.data as Package[]);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  }

  return (
    <section id="packages" className="py-16 lg:py-24 bg-muted/40">
      <div className="container">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              <CardTitle className="text-3xl font-headline">Find Your Perfect Package</CardTitle>
            </div>
            <CardDescription>Use our AI-powered tool to get personalized package recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField control={form.control} name="priceRange" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select price range" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="₹75,000-₹1,50,000">₹75,000 - ₹1,50,000</SelectItem>
                          <SelectItem value="₹1,50,000-₹3,00,000">₹1,50,000 - ₹3,00,000</SelectItem>
                          <SelectItem value="₹3,00,000+">₹3,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="airlinePreference" render={({ field }) => (
                     <FormItem>
                       <FormLabel>Airline</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger><SelectValue placeholder="Select airline" /></SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="Any">Any</SelectItem>
                           <SelectItem value="Emirates">Emirates</SelectItem>
                           <SelectItem value="Saudi Airlines">Saudi Airlines</SelectItem>
                           <SelectItem value="Qatar Airways">Qatar Airways</SelectItem>
                           <SelectItem value="Turkish Airlines">Turkish Airlines</SelectItem>
                         </SelectContent>
                       </Select>
                     </FormItem>
                   )} />
                  <FormField control={form.control} name="duration" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="5-7">5-7 Days</SelectItem>
                           <SelectItem value="7-10">7-10 Days</SelectItem>
                           <SelectItem value="10-14">10-14 Days</SelectItem>
                           <SelectItem value="14+">14+ Days</SelectItem>
                         </SelectContent>
                       </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="distanceFromHaram" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance from Haram</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger><SelectValue placeholder="Select distance" /></SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="0-500m">0-500m</SelectItem>
                           <SelectItem value="500m-1km">500m - 1km</SelectItem>
                           <SelectItem value="1km+">1km+</SelectItem>
                         </SelectContent>
                       </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="foodPreference" render={({ field }) => (
                     <FormItem>
                       <FormLabel>Food</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger><SelectValue placeholder="Select food preference" /></SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="Any">Any</SelectItem>
                           <SelectItem value="Included">Included</SelectItem>
                           <SelectItem value="Breakfast Only">Breakfast Only</SelectItem>
                           <SelectItem value="Not Included">Not Included</SelectItem>
                         </SelectContent>
                       </Select>
                     </FormItem>
                  )} />
                  <FormField control={form.control} name="departureLocation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departure Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., JFK, LHR" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <FormField control={form.control} name="ziyaratGuideAvailability" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm col-span-1 md:col-span-3 bg-background">
                      <div className="space-y-0.5">
                        <FormLabel>Ziyarat Guide</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Get Recommendations
                  </Button>
                </div>
              </form>
            </Form>
            
            {(isLoading || recommendedPackages.length > 0) && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold font-headline mb-6 text-center">
                  {isLoading ? 'Finding Best Packages...' : 'Recommended for You'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i}>
                        <Skeleton className="h-[200px] w-full" />
                        <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                        <CardContent className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    recommendedPackages.map((pkg) => (
                      <PackageCard 
                        key={pkg.id} 
                        package={pkg} 
                        onCompareToggle={onCompareToggle}
                        isSelected={isPackageSelected(pkg.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
