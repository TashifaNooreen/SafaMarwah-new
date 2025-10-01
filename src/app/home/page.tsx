'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomeView } from "@/components/views/home-view";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        router.push('/');
      }
    } catch (error) {
      // localStorage is not available, redirect to login
      router.push('/');
    }
  }, [router]);

  return <HomeView />;
}
