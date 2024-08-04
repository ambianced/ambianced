"use client";

import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getAccessToken, getCurrentlyPlayingFetcher } from "@/lib/spotify";


export default function Home() {
  const handleClick = async () => {
   const token = await getAccessToken();
    const data = await getCurrentlyPlayingFetcher("BQA8FKpx3yVO2GE0kIvWUSMVjI6tYalUaB-O1S35Us-bk9nvCWXQBLVFthXONnXkVJjkorxU0LYKSUSa9f0zRl63k42l-R2boqLyQyaR64AbRh54IgUUzu6vNIwiJrlKubyxshqm7kIg_FBKcZOO6CmFLiE3GXcuN_UMunb_4JHXxovm2oNc7mmj6Khezo_CrYiM");
    console.log("ciao")
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
        <Button className="w-full md:w-1/3" onClick={handleClick}>Get Started</Button>
      </section>
    </>
  );
}
