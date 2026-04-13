const COMPANY_LOGOS = [
  { src: "/cases/logos/aulandilogo.png", alt: "Aulandi" },
  { src: "/cases/logos/bastlogo.png", alt: "Bast Transform" },
  { src: "/cases/logos/globalvisionlogo.png", alt: "Global Vision" },
  { src: "/cases/logos/mebelvsemlogo.png", alt: "Мебель Всем" },
  { src: "/cases/logos/mzologo.png", alt: "MZO" },
  { src: "/cases/logos/profisoftlogo.png", alt: "Profisoft" },
  { src: "/cases/logos/royalcateringlogo.png", alt: "Royal Catering" },
  { src: "/cases/logos/stalekslogo.png", alt: "Staleks" },
  { src: "/cases/logos/successlogo.png", alt: "Success HoReCa" },
  { src: "/cases/logos/tumarcarpetslogo.png", alt: "Tumar Carpets" },
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
    <section className="border-y border-[var(--border)] bg-[var(--bg)] py-4 md:py-5">
      <div className="container-site">
        <div className="logo-marquee-panel">
          <div className="logo-marquee-shell">
            <LogoRow />
            <LogoRow />
          </div>
        </div>
      </div>
    </section>
  );
}
