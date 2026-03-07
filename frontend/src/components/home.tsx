import { useState, useEffect } from "react";
import Footer from "./IndividualComponents/footer";

const backgroundImages = [
  "https://wmc.shop/cdn/shop/collections/grandson_jpg_184c5da8-ab6e-46a5-bf08-78e376cd04bb.webp?v=1762280946",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/BandMaid_Dallas_211022.jpg/1920px-BandMaid_Dallas_211022.jpg",
  "https://metaltower.net/wp-content/uploads/2024/10/BabyMetal-band-photo-2.jpeg",
  "https://www.ironmaiden.com/files/2024/08/WS_2023_Lineup.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/58/Hanabie_Hamburg_20240704.jpg",
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="bg-white justify-start items-center flex min-h-screen min-w-screen flex-col">
        <section className="mt-10 relative overflow-hidden border-nav_steel_gray border-5 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] w-[90%] rounded-2xl h-[40vh] flex justify-center items-center flex-col">
          {backgroundImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="select-none text-7xl font-bold text-white mb-2 drop-shadow-md">
              Tus bandas y artistas favoritos
            </h1>
            <h1 className="select-none text-7xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-gradient">
              En donde quieras
            </h1>
          </div>
        </section>

        <section className="w-[90%] bg-nav_steel_gray mt-10 mb-10 h-[10vh] rounded-2xl border-solid flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1 className="select-none text-7xl font-bold text-black">
            Trending
          </h1>
        </section>

        <section className=""></section>

        <Footer />
      </main>
    </>
  );
}

export default Home;
