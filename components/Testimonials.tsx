import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-900/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          Kata mereka yang sudah mencoba
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="glass flex flex-col rounded-2xl p-7">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-slate-800 pt-4">
                <p className="font-display font-semibold text-slate-100">
                  {t.name}
                </p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
