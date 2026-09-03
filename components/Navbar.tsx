const NAV_LINKS = [];

// NOTE: nav links and the CTA below point to "#" — this page currently
// only has a Hero section, so there's nothing yet for them to link to.
// Wire these up once the corresponding sections/pages exist.

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-8 py-6">
        <a href="#home" className="font-display text-[30px] leading-none text-ink">
          ChokY<sup className="text-xs align-super">™</sup>
        </a>

        <ul className="col-start-2 hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="col-start-3 justify-self-end">
          <a
            href="https://www.karimunjawa.tours/"
            className="inline-flex items-center rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.03]"
          >
            Temukan Trip Impianmu
          </a>
        </div>
      </nav>
    </header>
  );
}
