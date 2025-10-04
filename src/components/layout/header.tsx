"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/chat", label: "Find Packages" },
  { href: "/home#about", label: "About" },
  { href: "/home#contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    try {
      const loggedInStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsLoggedIn(loggedInStatus);
    } catch (error) {
      // localStorage is not available
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
        console.error("Could not remove auth status from local storage", error);
    }
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "border-b bg-background/80 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                  "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
                  item.label === "Find Packages" ? "text-primary font-bold" : ""
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            {isClient && isLoggedIn ? (
              <UserMenu onLogout={handleLogout} />
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => router.push('/')}>Sign In</Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex h-full flex-col">
                  <div className="mb-8">
                     <SheetClose asChild>
                       <Logo />
                     </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          className="text-lg font-medium"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col gap-2">
                     {isClient && isLoggedIn ? (
                       <Button onClick={handleLogout} variant="outline">Sign Out</Button>
                     ) : (
                       <>
                         <SheetClose asChild>
                           <Button variant="outline" onClick={() => router.push('/')}>Sign In</Button>
                         </SheetClose>
                       </>
                     )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const UserMenu = ({ onLogout }: { onLogout: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="User" data-ai-hint="user avatar"/>
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">Pilgrim</p>
          <p className="text-xs leading-none text-muted-foreground">
            pilgrim@example.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Saved Packages</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
