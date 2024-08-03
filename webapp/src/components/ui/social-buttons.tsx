"use client";
import { Button } from "./button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

const SocialButtons = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <Button
        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="button"
        onClick={() => onClick("github")}
        disabled
      >
        {/* TODO: I think they removed the GitHub icon for copyright reasons */}
        {/* <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" /> */}
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          GitHub
        </span>
        <BottomGradient />
      </Button>
      <Button
        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] hover:bg-gray-100 dark:hover:bg-zinc-800 dark:hover:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="button"
        onClick={() => onClick("google")}
      >
        {/* TODO: I think they removed the GitHub icon for copyright reasons */}
        {/* <IconBrandGoogleFilled className="h-4 w-4 text-neutral-800 dark:text-neutral-300" /> */}
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Google
        </span>
        <BottomGradient />
      </Button>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export { SocialButtons };
