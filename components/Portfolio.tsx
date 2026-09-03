import { Waves, Sunset, Fish, LayoutDashboard, Smartphone, Globe } from "lucide-react";

// NOTE for dev: these tiles are gradient placeholders standing in for real
// trip photos / project screenshots. Drop files into /public/gallery and
// swap each <PlaceholderTile> for a <Image src="/gallery/..." /> when ready.

const TRIP_SHOTS = [
  { label: "Snorkeling di Tanjung Gelam", icon: Fish, from: "from-teal-500/30", to: "to-slate-900" },
  { label: "Island hopping pagi hari", icon: Waves, from: "from-cyan-500/30", to: "to-slate-900" },
  { label: "Sunset sailing", icon: Sunset, from: "from-emerald-500/30", to: "to-slate-900" },
];

const WEB_SHOTS = [
  { label: "karimunjawa.tours — halaman paket", icon: LayoutDashboard, from: "from-slate-700/50", to: "to-slate-900" },
  { label: "Landing page resort partner", icon: Globe, from: "from-slate-700/50", to: "to-slate-900" },
  { label: "Tampilan mobile booking flow", icon: Smartphone, from: "from-slate-700/50", to: "to-slate-900" },
];

function PlaceholderTile({
  label,
  icon: Icon,
  from,
  to,
}: {
  label: string;
  icon: React.ElementType;
  from: string;
  to: string;
}) {
  return (
    <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${from} ${to} transition-transform duration-500 group-hover:scale-105`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-9 w-9 text-slate-200/70" strokeWidth={1.5} />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-4 pb-3 pt-8 text-xs font-medium text-slate-200">
        {label}
      </figcaption>
    </figure>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          Dari lapangan sampai layar
        </h2>
        <p className="mt-4 max-w-xl text-slate-400 leading-relaxed">
          Sebagian momen tur bersama tamu, dan sebagian proyek website yang
          sudah dikerjakan untuk bisnis pariwisata lokal.
        </p>

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold text-teal-400">
            Momen di Karimunjawa
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {TRIP_SHOTS.map((shot) => (
              <PlaceholderTile key={shot.label} {...shot} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold text-cyan-400">
            Proyek web development
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {WEB_SHOTS.map((shot) => (
              <PlaceholderTile key={shot.label} {...shot} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
