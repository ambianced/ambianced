import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="https://github.com/joutad.png" />
            <AvatarFallback>JH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Joudat Haroon</CardTitle>
            <CardDescription>@joutad</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This project is awesome!</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          {/* <Image
            width={100}
            height={100}
            src="https://github.com/davdedev.png"
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          /> */}
          <Avatar className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover">
            <AvatarImage alt="" src="https://github.com/davdedev.png" />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center">David Pietrocola</CardTitle>
          <CardDescription className="font-normal text-primary">
            Techno King
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            I really enjoyed working on this project, it was a great learning
            experience.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <Link
              href="https://github.com/DavDeDev"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/pietrocoladavid/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Totally Free!
            {/* <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Most popular
            </Badge> */}
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>
        </CardHeader>

        <CardContent>
          <a href="/api/auth/login">
            <Button className="w-full">Start Free Trial</Button>
            </a>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["AI Powered", "UI Friendly"].map((benefit: string) => (
              <span key={benefit} className="flex">
                <Check className="text-green-500" />{" "}
                <h3 className="ml-2">{benefit}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
