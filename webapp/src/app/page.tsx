// import { auth } from "@/auth";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
// import Topbar from "@/components/Topbar";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Topbar session={session} />
      <Hero />
      <Footer />
    </>
  );
}
