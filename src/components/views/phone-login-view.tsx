'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Logo } from '@/components/ui/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const phoneSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number.').max(10, 'Please enter a valid 10-digit phone number.'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits.'),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export function PhoneLoginView() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  async function onPhoneSubmit(values: PhoneFormValues) {
    setIsLoading(true);
    // This is where you would call your backend to send an OTP
    // For now, we'll simulate a delay and then move to the OTP step
    console.log('Sending OTP to:', values.phone);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPhoneNumber(values.phone);
    setIsLoading(false);
    setStep('otp');
    toast({
      title: 'OTP Sent',
      description: 'An OTP has been sent to your mobile number.',
    });
  }

  async function onOtpSubmit(values: OtpFormValues) {
    setIsLoading(true);
    // This is where you would verify the OTP with your backend
    // For this mock, we'll accept any 6-digit OTP and simulate a delay
    console.log('Verifying OTP:', values.otp);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // On successful verification
    try {
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
       console.error("Could not set auth status in local storage", error);
    }
    
    setIsLoading(false);
    toast({
      title: 'Success!',
      description: 'You have been successfully logged in.',
    });
    router.push('/home');
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-muted/40">
       <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1604513325953-cc55f10a8b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb3NxdWUlMjBjbG9zZXVwfGVufDB8fHx8MTc1OTM4MTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Pilgrimage"
            fill
            className="object-cover"
            data-ai-hint="mosque closeup"
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className='flex justify-center mb-4'>
                <Logo />
            </div>
            <CardTitle className="text-2xl font-headline">
              {step === 'phone' ? 'Welcome, Pilgrim' : 'Verify Your Number'}
            </CardTitle>
            <CardDescription>
              {step === 'phone'
                ? 'Enter your mobile number to begin your sacred journey.'
                : `Enter the 6-digit code sent to +91 ${phoneNumber}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'phone' ? (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                              +91
                            </span>
                            <Input
                              type="tel"
                              placeholder="98765 43210"
                              className="pl-12"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send OTP
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="_ _ _ _ _ _"
                            maxLength={6}
                            {...field}
                            onChange={(e) => {
                                const { value } = e.target;
                                // allow only numbers and limit length
                                if (/^\d*$/.test(value) && value.length <= 6) {
                                  field.onChange(value);
                                }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify & Proceed
                  </Button>
                  <Button
                    variant="link"
                    type="button"
                    className="w-full text-sm text-muted-foreground"
                    onClick={() => {
                        setStep('phone');
                        otpForm.reset();
                    }}
                    disabled={isLoading}
                  >
                    Change Number
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
