import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";


export default async function Home() {
  return (
    <>
      <Topbar />
      <section className="w-full py-20 gap-10 flex flex-col justify-center">
        <div className=" w-full flex justify-center">
          <h1 className="font-bold text-4xl">Dashboard</h1>
        </div>
        <div className=" w-full flex justify-center">
      <BookOpen size={256}/>
        </div>
      <Button className="w-1/8 mx-auto">Get Started</Button>
      </section>
    </>
  );
}
