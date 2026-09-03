import { Check, MessageCircle } from "lucide-react";
import { TOUR_PACKAGES, buildWhatsAppLink } from "@/lib/constants";

export default function TourPackages() {
  return (
    <section id="packages" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            Paket Tur Karimunjawa
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Tiga cara menikmati Karimunjawa, dari yang paling hemat sampai
            yang dirancang khusus untuk momen tertentu. Harga per orang,
            sudah termasuk penyeberangan dan penginapan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TOUR_PACKAGES.map((pkg) => {
            const waLink = buildWhatsAppLink(
              `Halo ChokY, saya mau booking paket ${pkg.name} (${pkg.duration}). Apakah masih tersedia?`
            );
            return (
              <article
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl p-7 transition-transform hover:-translate-y-1 ${
                  pkg.featured
                    ? "border border-teal-500/50 bg-slate-900/80 shadow-xl shadow-teal-500/10"
                    : "glass"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-teal-400 px-3 py-1 text-xs font-semibold text-slate-950">
                    Paling laris
                  </span>
                )}

                <p className="text-xs font-medium text-cyan-400">
                  {pkg.duration} &middot; {pkg.bestFor}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-50">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{pkg.tagline}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-xs text-slate-500">Mulai dari</span>
                </div>
                <p className="font-display text-2xl font-bold text-slate-50">
                  Rp{pkg.price}
                  <span className="text-sm font-normal text-slate-500">
                    {" "}
                    /orang
                  </span>
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {pkg.facilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
                    pkg.featured
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                      : "border border-slate-700 text-slate-200 hover:border-emerald-400/60 hover:text-emerald-300"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                  Book via WA
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
