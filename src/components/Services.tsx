"use client";

import { useCallback, useEffect, useId, useState } from "react";
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

type CardProduct =
  | { kind: "pack"; pack: ProductPack }
  | { kind: "consulting" }
  | { kind: "maintenance" };

function stageTitlesForCard(p: CardProduct): string[] {
  if (p.kind === "pack") return p.pack.items.map((i) => i.title);
  if (p.kind === "consulting") return consultingProduct.blocks.map((b) => b.title);
  return maintenanceServices.map((r) => r.service);
}

function cardTitle(p: CardProduct): string {
  if (p.kind === "pack") return p.pack.title;
  if (p.kind === "consulting") return consultingProduct.title;
  return maintenanceIntro.title;
}

function cardTeaser(p: CardProduct): string {
  if (p.kind === "pack") return p.pack.teaser;
  if (p.kind === "consulting") return consultingProduct.teaser;
  return maintenanceIntro.teaser;
}

function cardIcon(p: CardProduct): string {
  if (p.kind === "pack") return p.pack.icon;
  if (p.kind === "consulting") return consultingProduct.icon;
  return maintenanceIntro.icon;
}

function cardPriceLabel(p: CardProduct): string {
  if (p.kind === "pack") return p.pack.priceLabel;
  if (p.kind === "consulting") return consultingProduct.priceLabel;
  return maintenanceIntro.cardPriceLabel;
}

function cardFeatured(p: CardProduct): boolean {
  return p.kind === "pack" && Boolean(p.pack.featured);
}

function modalSlug(p: CardProduct): string {
  if (p.kind === "pack") return p.pack.slug;
  if (p.kind === "consulting") return consultingProduct.slug;
  return maintenanceIntro.slug;
}

function addToCartPayload(p: CardProduct):
  | { title: string; price: string; numericPrice: number }
  | null {
  if (p.kind === "pack") {
    const x = p.pack;
    return {
      title: `${x.label}. ${x.title}`,
      price: x.priceLabel,
      numericPrice: x.numericPrice,
    };
  }
  if (p.kind === "consulting") {
    const x = consultingProduct;
    return { title: `${x.label}. ${x.title}`, price: x.priceLabel, numericPrice: x.numericPrice };
  }
  return null;
}

function PackDetailBlock({ item }: { item: ProductPackItem }) {
  return (
    <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-2)]/50 p-4">
      <h4 className="text-sm font-bold text-[var(--text)]">{item.title}</h4>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{item.description}</p>
      <p className="mt-3 border-t border-[var(--border)] pt-3 text-[12px] leading-snug text-[var(--accent-soft)]">
        <span className="font-semibold text-[var(--accent)]">Результат: </span>
        {item.result}
      </p>
    </div>
  );
}

function ProductDetailModal({
  slug,
  onClose,
}: {
  slug: string | null;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const titleId = useId();

  useEffect(() => {
    if (!slug) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug, onClose]);

  const handleAddPackOrConsulting = useCallback(() => {
    const pack = productPacks.find((p) => p.slug === slug);
    if (pack) {
      addToCart({
        title: `${pack.label}. ${pack.title}`,
        price: pack.priceLabel,
        numericPrice: pack.numericPrice,
      });
      onClose();
      return;
    }
    if (slug === consultingProduct.slug) {
      const x = consultingProduct;
      addToCart({ title: `${x.label}. ${x.title}`, price: x.priceLabel, numericPrice: x.numericPrice });
      onClose();
    }
  }, [slug, addToCart, onClose]);

  if (!slug) return null;

  const pack = productPacks.find((p) => p.slug === slug);
  const isConsulting = slug === consultingProduct.slug;
  const isMaintenance = slug === maintenanceIntro.slug;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[min(92vh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-t-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] sm:rounded-[var(--radius)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-5 py-4 md:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
            Подробности
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
            aria-label="Закрыть окно"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
          {pack ? (
            <>
              <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {pack.label}
                  </p>
                  <h2
                    id={titleId}
                    className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase leading-tight tracking-[0.02em] text-[var(--text)] md:text-3xl"
                  >
                    {pack.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{pack.audience}</p>
                </div>
                <div className="shrink-0 rounded-sm border border-[var(--border)] bg-[var(--bg)]/45 px-5 py-4 md:min-w-[220px]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Стоимость
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)]">
                    {pack.priceLabel}
                  </div>
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Срок
                  </div>
                  <div className="mt-1 text-sm font-medium text-[var(--text)]">{pack.timeline}</div>
                </div>
              </div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                Включено в пакет
              </p>
              <div className="mb-8 grid gap-3 sm:grid-cols-2">
                {pack.items.map((item) => (
                  <PackDetailBlock key={item.title} item={item} />
                ))}
              </div>
              <p className="mb-8 text-sm leading-relaxed text-[var(--muted)]">
                <span className="font-semibold text-[var(--accent)]">Итог: </span>
                {pack.summary}
              </p>
              <button
                type="button"
                onClick={handleAddPackOrConsulting}
                className="w-full rounded-sm bg-[var(--accent)] py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--bg)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                В корзину
              </button>
            </>
          ) : null}

          {isConsulting ? (
            <>
              <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {consultingProduct.label}
                  </p>
                  <h2
                    id={titleId}
                    className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase leading-tight tracking-[0.02em] text-[var(--text)] md:text-3xl"
                  >
                    {consultingProduct.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[var(--accent-soft)]">
                    {consultingProduct.format}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                    {consultingProduct.audience}
                  </p>
                </div>
                <div className="shrink-0 rounded-sm border border-[var(--border)] bg-[var(--bg)]/45 px-5 py-4 md:min-w-[220px]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Стоимость
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text)]">
                    {consultingProduct.priceLabel}
                  </div>
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Срок
                  </div>
                  <div className="mt-1 text-sm font-medium text-[var(--text)]">
                    {consultingProduct.timeline}
                  </div>
                </div>
              </div>
              <div className="mb-8 space-y-6">
                {consultingProduct.blocks.map((block, i) => (
                  <div
                    key={block.title}
                    className="rounded-sm border border-[var(--border)] bg-[var(--surface-2)]/40 p-5"
                  >
                    <div className="mb-3 flex items-baseline gap-3">
                      <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-bold text-[var(--text)]">{block.title}</h3>
                    </div>
                    <ul className="mb-4 list-none space-y-2">
                      {block.body.map((line, li) => (
                        <li
                          key={`${block.title}-${li}`}
                          className="flex gap-2 text-[13px] leading-relaxed text-[var(--muted)] before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-[var(--accent)]/70 before:content-['']"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                    <p className="border-t border-[var(--border)] pt-4 text-[12px] leading-snug text-[var(--accent-soft)]">
                      <span className="font-bold text-[var(--accent)]">Результат: </span>
                      {block.result}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddPackOrConsulting}
                className="w-full rounded-sm bg-[var(--accent)] py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--bg)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                В корзину
              </button>
            </>
          ) : null}

          {isMaintenance ? (
            <>
              <div className="mb-6">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {maintenanceIntro.label}
                </p>
                <h2
                  id={titleId}
                  className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase leading-tight tracking-[0.02em] text-[var(--text)] md:text-3xl"
                >
                  {maintenanceIntro.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  {maintenanceIntro.forWho}
                </p>
                <p className="mt-2 text-sm text-[var(--text)]">{maintenanceIntro.lead}</p>
              </div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                Что входит
              </p>
              <div className="mb-8 space-y-0 overflow-hidden rounded-sm border border-[var(--border)]">
                {maintenanceServices.map((row, idx) => (
                  <div
                    key={row.service}
                    className={`border-t border-[var(--border)] px-4 py-3 first:border-t-0 ${
                      idx % 2 === 1 ? "bg-[var(--surface-2)]/35" : ""
                    }`}
                  >
                    <div className="text-sm font-bold text-[var(--text)]">{row.service}</div>
                    <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                      {row.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                Тарифы
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {maintenanceTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex flex-col rounded-sm border border-[var(--border)] bg-[var(--surface-2)]/30 p-4"
                  >
                    <div className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--text)]">
                      {tier.name}
                    </div>
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
                      {tier.hours}
                    </div>
                    <p className="mb-3 flex-1 text-[12px] leading-snug text-[var(--muted)]">{tier.fit}</p>
                    <div className="mb-3 text-sm font-semibold text-[var(--text)]">{tier.priceLabel}</div>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          title: `Сопровождение amo — ${tier.name} (${tier.hours})`,
                          price: tier.priceLabel,
                          numericPrice: tier.numericPrice,
                        });
                        onClose();
                      }}
                      className="mt-auto w-full rounded-sm bg-[var(--accent)] py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--bg)] hover:bg-[var(--accent-hover)]"
                    >
                      В корзину
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onOpen,
}: {
  product: CardProduct;
  onOpen: (slug: string) => void;
}) {
  const { addToCart } = useCart();
  const stages = stageTitlesForCard(product);
  const slug = modalSlug(product);
  const payload = addToCartPayload(product);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(slug);
        }
      }}
      className={`group relative flex min-h-full cursor-pointer flex-col overflow-hidden border bg-[var(--surface)] px-6 pb-8 pt-9 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
        cardFeatured(product)
          ? "border-[var(--accent)]/50 bg-[linear-gradient(160deg,var(--surface)_0%,rgba(184,154,98,0.07)_100%)] hover:-translate-y-0.5 hover:border-[var(--accent)]/65 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          : "border-[var(--border)] hover:-translate-y-0.5 hover:border-[var(--accent)]/55 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
      }`}
    >
      {cardFeatured(product) ? (
        <div className="absolute right-4 top-4 rounded-sm bg-[var(--accent)] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--bg)]">
          Популярное
        </div>
      ) : null}

      <div className="mb-4 text-[34px] leading-none" aria-hidden>
        {cardIcon(product)}
      </div>
      <h3 className="mb-2 pr-2 text-lg font-bold uppercase leading-snug text-[var(--text)]">
        {cardTitle(product)}
      </h3>
      <p className="mb-5 text-sm leading-[1.65] text-[var(--muted)]">{cardTeaser(product)}</p>

      <ul className="mb-6 flex-1 list-none space-y-0">
        {stages.map((line) => (
          <li
            key={line}
            className="flex items-start gap-2 border-b border-[var(--border)] py-2 text-[12px] leading-snug text-[var(--muted)] last:border-b-0"
          >
            <span className="font-bold text-[var(--accent)]">—</span>
            {line}
          </li>
        ))}
      </ul>

      <div className="mb-5 font-[family-name:var(--font-display)] text-[22px] leading-none tracking-tight text-[var(--text)] xl:text-[26px]">
        {cardPriceLabel(product)}
        {product.kind !== "maintenance" ? (
          <span className="font-[family-name:var(--font-body)] text-sm font-normal text-[var(--muted)]">
            {" "}
            / пакет
          </span>
        ) : (
          <span className="font-[family-name:var(--font-body)] text-sm font-normal text-[var(--muted)]">
            {" "}
            (тарифы)
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (payload) {
            addToCart(payload);
          } else {
            onOpen(slug);
          }
        }}
        className="mt-auto w-full rounded-sm bg-[var(--accent)] py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--bg)] opacity-[0.92] transition-all duration-300 ease-out hover:bg-[var(--accent-hover)] group-hover:opacity-100"
      >
        {product.kind === "maintenance" ? "Тарифы и детали" : "В корзину"}
      </button>
    </article>
  );
}

const CARD_PRODUCTS: CardProduct[] = [
  ...productPacks.map((pack) => ({ kind: "pack" as const, pack })),
  { kind: "consulting" as const },
  { kind: "maintenance" as const },
];

export default function Services() {
  const [detailSlug, setDetailSlug] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="border-t border-[var(--border)] scroll-mt-24 pt-36 pb-20 md:px-6 md:py-[100px]"
    >
      <div className="container-site">
        <header className="mb-14 md:mb-[60px]">
          <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] max-md:mb-6">
            amoCRM
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-[var(--text)] max-md:mt-1">
            Продуктовая линейка
          </h2>
          <div className="mt-6 h-0.5 w-[60px] bg-[var(--accent)]" />
          <p className="mt-6 max-w-2xl text-[var(--muted)] leading-relaxed">
            Четыре формата под разные этапы зрелости — нажмите на карточку, чтобы увидеть этапы, результаты и
            состав пакета.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {CARD_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.kind === "pack" ? product.pack.slug : `${product.kind}-${index}`}
              product={product}
              onOpen={setDetailSlug}
            />
          ))}
        </div>
      </div>

      <ProductDetailModal slug={detailSlug} onClose={() => setDetailSlug(null)} />
    </section>
  );
}
