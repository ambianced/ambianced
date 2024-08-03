import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link href="/" className="font-bold text-xl flex">
          {/* TODO */}
            <div>PUT A LOGO</div>
            Ambianced
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow US</h3>
          
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Platforms</h3>
          
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
         
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; HackThe6ix 2024
          
        </h3>
      </section>  
    </footer>
  );
};
