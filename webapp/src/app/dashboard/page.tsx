"use client";

import { imageToText, IntegrationType, update } from "@/actions";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Capture } from "@/core/capture";
import { getAccessToken } from "@/lib/spotify";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const interval = 5000;

  const [nodes, setNodes] = useState<React.ReactNode>([]);
  const [started, setStarted] = useState(false);

  const capture = new Capture(
    interval,
    async (buffer) => {
      const formData = new FormData();
      formData.append("blob", new Blob([buffer]))
      const passage = await imageToText(formData);
      setNodes(await Promise.all(['music','art'].flatMap((t) => update(passage, t as IntegrationType))));
    }
  );

  const handleClick = async () => {
    await capture.start();
    const token = await getAccessToken();
    if (!token) {
      return;
    }
    setStarted(true);
  };
  

  return (
    <>
      <Topbar />
      <section className="w-full py-20 gap-10 flex flex-col justify-center">
        {!started && (
          <>
            <div className="w-full flex justify-center">
              <h1 className="font-bold text-4xl">Dashboard</h1>
            </div>
            <div className="w-full flex justify-center">
             {/* <Image src='/logo.jpg' alt="logo" width={256} height={256}/> */}
            </div>
            <div className="w-full justify-center flex">
              <Button className="md:w-1/3" onClick={handleClick}>Get Started</Button>
            </div>
          </>
        )}
        {started && (
        <div className="w-screen flex flex-col justify-center h-screen relative">
          <div className="w-full justify-center flex absolute bottom-0 right-0">
            <Button className="md:w-1/3" onClick={() => capture.stop()}>Stop</Button>
          </div>
          {nodes}
        </div>
        )}
      </section>
    </>
  );
}
