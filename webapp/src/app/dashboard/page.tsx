"use client";

import { useState } from 'react';
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getAccessToken, getPlayback } from "@/lib/spotify";
import { Capture } from "@/core/capture";
import { imageToText, update, IntegrationType } from "@/actions";

import { getAccessToken, getPlayback, getPlayback1 } from "@/lib/spotify";
import { IntegrationCard } from "@/components/integration-card";
import { bookThemesAndSong } from "@/lib/const";

const dummyData = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Spotify.png/768px-Spotify.png",
    name: "Spotify",
    description: "Sync your music with what you are reading.",
    price: "$10/month",
    enabled: true,
  },
  {
    logo: "https://i.pinimg.com/736x/bb/0d/54/bb0d544644d9bebbd364d255832e3304.jpg",
    name: "Images",
    description: "Generate images to immerse yourself in the story.",
    price: "$20/month",
    enabled: false,
  },
  {
    logo: "https://www.cnet.com/a/img/resize/d558850911b771f69e60b8f6cf75305e3dd9842d/hub/2018/01/02/93e13a00-7e63-454f-b1a9-37ad68894ca0/nanoleaf-square-2.jpg?auto=webp&width=1200",
    name: "Lights",
    description: "Colour your room according to the story.",
    price: "Free",
    enabled: true,
  },
];

export default function Home() {
  const interval = 5000;

  const [nodes, setNodes] = useState<React.ReactNode>([]);

  const capture = new Capture(
    interval,
    async (buffer) => {
      const formData = new FormData();
      formData.append("blob", new Blob([buffer]))
      const passage = await imageToText(formData);
      setNodes(await Promise.all(['art'].flatMap((t) => update(passage, t as IntegrationType))));
    }
  );

  const handleClick = async () => {
    await capture.start();
    const token = await getAccessToken();
    console.log(token);
    if (!token) {
      return;
    }

    // Generate a random number between 0 and the length of bookThemesAndSongs - 1
    const randomIndex = Math.floor(Math.random() * bookThemesAndSong.length);
    const [theme, songUri] = bookThemesAndSong[randomIndex];

    console.log(`Selected theme: ${theme}`);
    console.log(`Song URI: ${songUri}`);

    try {
      const data1 = await getPlayback1(token, songUri, 0);
      console.log(data1);
    } catch (error) {
      console.error('Error during playback:', error);
    }
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
          <Button className="md:w-1/3" onClick={handleClick}>Get Started</Button>
        </div>
        <div>
          {nodes}
        </div>
      </section>
    </>
  );
}
