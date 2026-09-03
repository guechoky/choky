import SunsetHeroEnhanced from "./SunsetHeroEnhanced";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="relative h-screen w-full">
        <SunsetHeroEnhanced
          title="Halo, nama saya ChokY 👋"
          subtitle=""
        >
          <div className="mx-auto max-w-[1280px] px-8 text-center">
            <h1
              className="animate-fade-rise font-display font-normal text-white"
              style={{
                fontSize: "clamp(3rem, 7vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-2.46px",
              }}
            >
              Halo, nama saya ChokY 👋
            </h1>

            <p
              className="animate-fade-rise delay-200 mx-auto mt-6 max-w-[670px] text-lg text-white/90"
              style={{ lineHeight: 1.625 }}
            >
              Tour Organizer dan juga Web Developer karimujawa.tours. <br></br>Siap membantu mewujudkan liburan impianmu di Karimunjawa!
            </p>

            <div className="animate-fade-rise delay-[400ms] mt-12">
              <a
                href="https://wa.me/guechoky"
                className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-14 py-5 text-base font-medium text-white transition-all duration-300 ease-in-out hover:scale-[1.03] hover:bg-black/80"
              >
                Rencanakan Perjalanan
              </a>
            </div>
          </div>
        </SunsetHeroEnhanced>
      </div>
    </section>
  );
}
