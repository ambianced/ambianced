"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

import { ActivityIcon, BookOpen, Menu } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

import UserDropdown from "./UserDropdown";
import { useUser } from "@auth0/nextjs-auth0/client";

interface RouteProps {
  href: string;
  label: string;
}



export default function Topbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, error, isLoading } = useUser();

  return (
    <header className="fixed border-b-[1px] top-0 z-40 w-full bg-[#a8c3a2] dark:bg-[#2f4f2f]">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex gap-5">
             <BookOpen/>
              Ambianced
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                />

                <span className="sr-only">Menu Icon</span>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Ambianced
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                
                  {user ? (
                    <div className="flex gap-4 items-center">
                      <p className="text-zinc-700">
                      <span className="text-white"> Hello, {user.name}</span> 
                      </p>
                      <UserDropdown {...{ user }} />
                    </div>
                  ) : (
                    <a href="/api/auth/login">
                      <Button
                        className={`border ${buttonVariants({ variant: "secondary" })}`}
                      >
                        Sign-In
                      </Button>
                    </a>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
           
          </nav>

          <div className="hidden md:flex gap-2">
            {/* TODO: Implement Sign In Button */}
            {user ? (
              <div className="flex gap-4 items-center">
                <p className="text-white">Hello, {user.name}</p>
                <UserDropdown {...{ user }} />
              </div>
            ) : (
              <a href="/api/auth/login">
                <Button
                  className={`border ${buttonVariants({ variant: "secondary" })}`}
                >
                  Sign-In
                </Button>
              </a>
            )}
            {/* <AvatarDropDown/> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
