"use client";

import { useCart } from "@/context/CartContext";
import {
  consultingProduct,
  maintenanceIntro,
  maintenanceServices,
  maintenanceTiers,
  productPacks,
  type ProductPack,
  type ProductPackItem,
} from "@/data/crm-product-line";

function PackItemCard({ item }: { item: ProductPackItem }) {
  return (
    <div className="group rounded-sm border border-[var(--border)] bg-[var(--surface-2)]/50 p-4 transition-colors hover:border-[var(--accent)]/35">
      <h4 className="text-sm font-bold leading-snug text-[var(--text)]">{item.title}</h4>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{item.description}</p>
      <p className="mt-3 border-t border-[var(--border)]/80 pt-3 text-[12px] leading-snug text-[var(--accent-soft)]">
        <span className="font-semibold text-[var(--accent)]">Результат: </span>
        {item.result}
      </p>
    </div>
  );
}

function ProductPackCard({ pack }: { pack: ProductPack }) {
  const { addToCart } = useCart();

  return (
    <article
      className={`relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-6 pb-8 pt-8 transition-all duration-500 md:px-8 md:pt-9 ${
        pack.featured
          ? "border-[var(--accent)]/45 bg-[linear-gradient(165deg,var(--surface)_0%,rgba(184,154,98,0.09)_55%,var(--surface)_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
          : "hover:border-[var(--accent)]/40"
      }`}
    >
      {pack.featured ? (
        <div className="absolute right-5 top-5 rounded-sm bg-[var(--accent)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--bg)]">
          Полное внедрение
        </div>
      ) : null}

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="max-w-xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            {pack.label}
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase tracking-[0.02em] text-[var(--text)] md:text-3xl">
            {pack.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{pack.audience}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 rounded-sm border border-[var(--border)] bg-[var(--bg)]/40 px-5 py-4 md:min-w-[260px]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Стоимость
            </div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)] md:text-2xl">
              {pack.priceLabel}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Срок
            </div>
            <div className="mt-1 text-sm font-medium text-[var(--text)]">{pack.timeline}</div>
          </div>
        </div>
      </div>

      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
        Включено в пакет
      </div>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {pack.items.map((item) => (
          <PackItemCard key={item.title} item={item} />
        ))}
      </div>

      <div className="flex flex-col gap-6 border-t border-[var(--border)] pt-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          <span className="font-semibold text-[var(--accent)]">Итог: </span>
          {pack.summary}
        </p>
        <button
          type="button"
          onClick={() =>
            addToCart({
              title: `${pack.label}. ${pack.title}`,
              price: pack.priceLabel,
              numericPrice: pack.numericPrice,
            })
          }
          className="shrink-0 rounded-sm bg-[var(--accent)] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--bg)] transition-all duration-300 hover:bg-[var(--accent-hover)]"
        >
          В корзину
        </button>
      </div>
    </article>
  );
}

function ConsultingSection() {
  const { addToCart } = useCart();
  const p = consultingProduct;

  return (
    <article className="border border-[var(--accent)]/35 bg-[linear-gradient(180deg,var(--surface)_0%,rgba(184,154,98,0.06)_40%,var(--surface)_100%)] px-6 py-10 md:px-10 md:py-12">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            {p.label}
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-[var(--text)]">
            {p.title}
          </h3>
          <p className="mt-3 text-sm font-medium text-[var(--accent-soft)]">{p.format}</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{p.audience}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 rounded-sm border border-[var(--border)] bg-[var(--bg)]/50 px-5 py-4 md:min-w-[280px]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Стоимость
            </div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text)]">
              {p.priceLabel}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              Срок
            </div>
            <div className="mt-1 text-sm font-medium text-[var(--text)]">{p.timeline}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {p.blocks.map((block, i) => (
          <div
            key={block.title}
            className="flex flex-col rounded-sm border border-[var(--border)] bg-[var(--surface-2)]/40 p-5 md:p-6"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold leading-none text-[var(--accent)]/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="text-base font-bold leading-snug text-[var(--text)]">{block.title}</h4>
            </div>
            <ul className="mb-6 flex-1 list-none space-y-2.5">
              {block.body.map((line, li) => (
                <li
                  key={`${block.title}-${li}`}
                  className="flex gap-2 text-[13px] leading-relaxed text-[var(--muted)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)]/70 before:content-['']"
                >
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-[var(--border)] pt-4 text-[12px] leading-snug text-[var(--accent-soft)]">
              <span className="font-bold text-[var(--accent)]">Результат: </span>
              {block.result}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center md:justify-end">
        <button
          type="button"
          onClick={() =>
            addToCart({
              title: `${p.label}. ${p.title}`,
              price: p.priceLabel,
              numericPrice: p.numericPrice,
            })
          }
          className="w-full rounded-sm bg-[var(--accent)] py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--bg)] transition-all duration-300 hover:bg-[var(--accent-hover)] md:w-auto md:px-12"
        >
          В корзину
        </button>
      </div>
    </article>
  );
}

function MaintenanceSection() {
  const { addToCart } = useCart();
  const intro = maintenanceIntro;

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-10 md:px-8 md:py-11">
      <div className="mb-10 max-w-3xl">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          {intro.label}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase tracking-[0.02em] text-[var(--text)] md:text-3xl">
          {intro.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{intro.forWho}</p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--text)]">{intro.lead}</p>
      </div>

      <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
        Что входит в сопровождение
      </div>
      <div className="mb-10 overflow-hidden rounded-sm border border-[var(--border)]">
        <div className="hidden grid-cols-[minmax(140px,200px)_1fr] gap-0 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] md:grid">
          <div>Услуга</div>
          <div>Описание</div>
        </div>
        {maintenanceServices.map((row, idx) => (
          <div
            key={row.service}
            className={`grid gap-3 border-[var(--border)] px-4 py-4 md:grid-cols-[minmax(140px,200px)_1fr] md:gap-6 md:py-3.5 ${
              idx > 0 ? "border-t" : "md:border-t-0"
            } ${idx % 2 === 1 ? "bg-[var(--surface-2)]/35" : ""}`}
          >
            <div className="text-[13px] font-bold text-[var(--text)] md:text-sm">{row.service}</div>
            <div className="text-[13px] leading-relaxed text-[var(--muted)]">{row.description}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
        Формат сотрудничества
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {maintenanceTiers.map((tier) => (
          <div
            key={tier.name}
            className="flex flex-col border border-[var(--border)] bg-[var(--surface-2)]/30 p-5 transition-colors hover:border-[var(--accent)]/45"
          >
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--text)]">
                {tier.name}
              </span>
              <span className="rounded-sm bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
                {tier.hours}
              </span>
            </div>
            <p className="mb-5 flex-1 text-[13px] leading-relaxed text-[var(--muted)]">{tier.fit}</p>
            <div className="mb-4 font-[family-name:var(--font-display)] text-xl text-[var(--text)]">
              {tier.priceLabel}
            </div>
            <button
              type="button"
              onClick={() =>
                addToCart({
                  title: `Сопровождение amo — ${tier.name} (${tier.hours})`,
                  price: tier.priceLabel,
                  numericPrice: tier.numericPrice,
                })
              }
              className="mt-auto w-full rounded-sm border border-[var(--accent)]/50 bg-transparent py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            >
              В корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="border-t border-[var(--border)] py-[100px] md:px-6">
      <div className="container-site">
        <header className="mb-14 md:mb-[60px]">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            amoCRM
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-[var(--text)]">
            Продуктовая линейка
          </h2>
          <div className="mt-6 h-0.5 w-[60px] bg-[var(--accent)]" />
          <p className="mt-6 max-w-2xl text-[var(--muted)] leading-relaxed">
            Четыре формата: быстрый старт, полное внедрение, построение отдела продаж на базе amoCRM и
            ежемесячное сопровождение — от первых заявок в системе до зрелого ОП с цифрами и контролем.
          </p>
        </header>

        <div className="flex flex-col gap-8 md:gap-10">
          {productPacks.map((pack) => (
            <ProductPackCard key={pack.slug} pack={pack} />
          ))}
          <ConsultingSection />
          <MaintenanceSection />
        </div>
      </div>
    </section>
  );
}
