"use client";

import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getAccessToken, getPlayback } from "@/lib/spotify";


export default function Home() {
  const handleClick = async () => {
    const token = await getAccessToken();
    if (!token) {
      return;
    }
    const data = await getPlayback(token);
    console.log(data);
  };

  return (
    <>
      <Topbar />
      <section className="w-full py-20 gap-10 flex flex-col justify-center">
        <div className="w-full flex justify-center">
          <h1 className="font-bold text-4xl">Dashboard</h1>
        </div>
        <div className="w-full flex justify-center">
          <BookOpen size={256} />
        </div>
        <div className="w-full justify-center flex">
          <Button className="w- md:w-1/3" onClick={handleClick}>Get Started</Button>
        </div>
      </section>
    </>
  );
}
