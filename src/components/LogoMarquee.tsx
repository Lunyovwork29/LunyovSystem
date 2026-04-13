const COMPANY_LOGOS = [
  { src: "/cases/logos/mzo.png", alt: "MZO" },
  { src: "/cases/logos/mebelvsem.png", alt: "Мебель Всем" },
  { src: "/cases/logos/globalvision.png", alt: "Global Vision" },
  { src: "/cases/logos/royalcatering.png", alt: "Royal Catering" },
  { src: "/cases/logos/success.png", alt: "Success HoReCa" },
  { src: "/cases/logos/aulandi.png", alt: "Aulandi" },
  { src: "/cases/logos/bast.png", alt: "Bast Transform" },
  { src: "/cases/logos/staleks.png", alt: "Staleks" },
  { src: "/cases/logos/tumarcarpets.png", alt: "Tumar Carpets" },
];

function LogoRow() {
  return (
    <ul className="logo-marquee-track" aria-hidden>
      {COMPANY_LOGOS.map((logo) => (
        <li key={logo.src} className="logo-marquee-item">
          {/* Логотипы храним локально и рендерим без доменных ограничений */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt={logo.alt} loading="lazy" className="logo-marquee-image" />
        </li>
      ))}
    </ul>
  );
}

export default function LogoMarquee() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]/75 py-5 md:py-6">
      <div className="container-site">
        <div className="logo-marquee-shell">
          <LogoRow />
          <LogoRow />
        </div>
      </div>
    </section>
  );
}
