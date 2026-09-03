import { MapPinned, Zap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              Dua dunia, satu orang.
            </h2>
            <p className="mt-5 max-w-md text-slate-400 leading-relaxed">
              Saya ChokY, tinggal dan menjalankan Karimunjawa Tours dari
              pulau ini sejak 2015. Selain memandu wisatawan ke titik-titik
              terbaik yang jarang muncul di internet, saya juga membangun
              website — mulai dari halaman pemesanan tur saya sendiri sampai
              situs untuk resort dan bisnis pariwisata lain di sekitar sini.
            </p>
            <p className="mt-4 max-w-md text-slate-400 leading-relaxed">
              Kombinasi ini bukan kebetulan: tamu sekarang riset dan booking
              lewat HP, jadi pengalaman digital yang cepat sama pentingnya
              dengan pengalaman di lapangan.
            </p>
          </div>

          <div className="space-y-5">
            <h3 className="font-display text-lg font-semibold text-slate-200">
              Mengapa memilih ChokY?
            </h3>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-500/30">
                  <MapPinned className="h-5 w-5 text-teal-400" />
                </span>
                <div>
                  <p className="font-display font-semibold text-slate-100">
                    Local Knowledge
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    Lahir dan besar di Karimunjawa — tahu spot snorkeling
                    yang belum ramai, waktu terbaik menyeberang, dan
                    penginapan mana yang benar-benar sesuai kebutuhan tamu.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/30">
                  <Zap className="h-5 w-5 text-cyan-400" />
                </span>
                <div>
                  <p className="font-display font-semibold text-slate-100">
                    Tech-Savvy
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    Respons cepat lewat WhatsApp, sistem pengecekan harga
                    yang selalu update, dan situs web yang dirancang supaya
                    tamu bisa booking dalam hitungan menit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
