import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { HeroCards } from "./HeroCards";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#FFA500] via-[#FF7F00] to-[#FF4500] text-transparent bg-clip-text">
              Ambianced
            </span>{" "}
          </h1>{" "}
          to create{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Immersive Scenario
            </span>{" "}
            when{" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Reading
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Create immersive scenarios for your reading experience. Ambianced
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          {/* TODO: Implement a dialog to ask "are you a nurse?" or "are you a patient?" */}
          <Link href="/auth/login">
            <Button className="w-full md:w-1/3">Get Started</Button>
          </Link>
          <Link
            href="https://github.com/ambianced/ambianced/tree/feat-screen-capture"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
