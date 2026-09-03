const VIDEO_SRC =
  "https://designerstephen.github.io/public-assets/videos/serene-art-hero.mp4";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-video-fallback"
    >
      {/* Full-bleed background video. bg-video-fallback shows while it loads. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Subtle dark scrim so navy text stays legible over the footage */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-8 text-center">
        <h1
          className="animate-fade-rise font-display font-normal text-ink"
          style={{
            fontSize: "clamp(3rem, 7vw, 80px)",
            lineHeight: 0.95,
            letterSpacing: "-2.46px",
          }}
        >
          Halo, nama saya ChokY 👋
        </h1>

        <p
          className="animate-fade-rise delay-200 mx-auto mt-6 max-w-[670px] text-lg text-muted"
          style={{ lineHeight: 1.625 }}
        >
          Tour Organizer dan juga Web Developer karimunawa.tours. <br></br>Siap membantu mewujudkan liburan impianmu di Karimunjawa!
        </p>

        <div className="animate-fade-rise delay-[400ms] mt-12">
          <a
            href="https://wa.me/guechoky"
            className="inline-flex items-center rounded-full bg-black px-14 py-5 text-base font-medium text-white transition-transform duration-300 ease-in-out hover:scale-[1.03]"
          >
            Rencanakan Perjalanan
          </a>
        </div>
      </div>
    </section>
  );
}
