// import { auth } from "@/auth";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Topbar from "@/components/Topbar";

export default async function Home() {
  return (
    <>
      <Topbar />
      <Hero />
      <Footer />
    </>
  );
}
