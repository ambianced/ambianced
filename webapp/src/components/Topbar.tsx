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

import { ActivityIcon, Menu } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";

import UserDropdown from "./UserDropdown";
import { useUser } from "@auth0/nextjs-auth0/client";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/about",
    label: "About",
  },
];

export default function Topbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, error, isLoading } = useUser();

  return (
    <header className="fixed border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex gap-5">
              <ActivityIcon />
              Ambianced
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

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
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  {user ? (
                    <div className="flex gap-4 items-center">
                      <p className="text-muted-foreground">
                        Hello, {user.name}
                      </p>
                      <UserDropdown {...{ user }} />
                    </div>
                  ) : (
                    <Link href="/auth/login" passHref>
                      <Button
                        className={`border ${buttonVariants({ variant: "secondary" })}`}
                      >
                        <ActivityIcon className="mr-2 w-5 h-5" />
                        Sign-In
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            {/* TODO: Implement Sign In Button */}
            {user ? (
              <div className="flex gap-4 items-center">
                <p className="text-muted-foreground">Hello, {user.name}</p>
                <UserDropdown {...{ user }} />
              </div>
            ) : (
              <Link href="/auth/login" passHref>
                <Button
                  className={`border ${buttonVariants({ variant: "secondary" })}`}
                >
                  <ActivityIcon className="mr-2 w-5 h-5" />
                  Sign-In
                </Button>
              </Link>
            )}
            {/* <AvatarDropDown/> */}

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
