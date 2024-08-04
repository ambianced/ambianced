"use client";

import { useState } from 'react';
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getAccessToken, getPlayback } from "@/lib/spotify";
import { Capture } from "@/core/capture";
import { imageToText, update, IntegrationType } from "@/actions";


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
        <div>
          {nodes}
        </div>
      </section>
    </>
  );
}
