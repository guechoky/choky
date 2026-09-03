import { MessageCircle } from "lucide-react";
import { TECH_STACK, WEBDEV_FEATURES, buildWhatsAppLink } from "@/lib/constants";

const waLink = buildWhatsAppLink(
  "Halo ChokY, saya tertarik membuat website untuk bisnis saya. Bisa minta info jasa web development-nya?"
);

export default function WebDevServices() {
  return (
    <section id="webdev" className="relative overflow-hidden bg-slate-900/40 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,_rgba(34,211,238,0.10),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              Butuh website modern untuk tur, resort, atau bisnismu?
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">
              Website yang saya pakai untuk Karimunjawa Tours sendiri
              dibangun dengan stack yang sama saya tawarkan ke klien:
              cepat, rapi di HP, dan langsung terhubung ke WhatsApp supaya
              calon tamu tidak perlu mengisi formulir panjang.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-700 bg-slate-900/60 px-3.5 py-1.5 text-xs font-medium text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition-transform hover:scale-[1.02] hover:bg-cyan-300"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
              Diskusi Kebutuhan Website
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {WEBDEV_FEATURES.map((feature) => (
              <div key={feature.title} className="glass rounded-2xl p-5">
                <p className="font-display font-semibold text-slate-100">
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
