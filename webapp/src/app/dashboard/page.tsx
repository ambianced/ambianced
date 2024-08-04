"use client";

import { imageToText, IntegrationType, update } from "@/actions";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Capture } from "@/core/capture";
import { getAccessToken } from "@/lib/spotify";
import { Spinner } from "@/components/ui/spinner";
import { useState } from 'react';

export default function Home() {
  const interval = 10000;

  const [nodes, setNodes] = useState<React.ReactNode[]>([]);
  const [state, setState] = useState<'inactive' | 'active' | 'loading'>('inactive');

  const capture = new Capture(
    interval,
    async (buffer) => {
      if (state == 'inactive') {
        setState('loading');
      }
      const formData = new FormData();
      formData.append("blob", new Blob([buffer]))
      const passage = await imageToText(formData);
      setNodes(await Promise.all(['music','art'].flatMap((t) => update(passage, t as IntegrationType))));
      setState('active');
    },
    async () => {
      setState('inactive');
      setNodes([]);
    },
  );

  const handleClick = async () => {
    await capture.start();
    const token = await getAccessToken();
    if (!token) {
      return;
    }
  };
 
  return (
    <>
      <Topbar />
      <section className="w-full py-20 gap-10 flex flex-col justify-center items-center">
        {state == 'inactive' && (
          <div className="w-full justify-center flex pt-10">
            <Button className="md:w-1/3" onClick={handleClick}>Start Reading</Button>
          </div>
        )}
        {state == 'loading' && nodes.length <= 0 && (
          <div className="pt-10">
            <Spinner/>
          </div>
        )}
        <div className="flex flex-col gap-10 justify-center">
          {nodes}
        </div>
      </section>
    </>
  );
}
