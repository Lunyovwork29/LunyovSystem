"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default function Cart() {
  const { cart, removeFromCart, total } = useCart();
  const [open, setOpen] = useState(false);

  const orderText = cart
    .map((item, index) => `${index + 1}. ${item.title} — ${item.price}`)
    .join("\n");

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Корзина пустая");
      return;
    }

    alert(
      `Вы выбрали:\n\n${orderText}\n\n${
        total > 0 ? `Итого: ${formatPrice(total)} ₸` : "Итого: рассчитывается индивидуально"
      }`
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-md border border-[rgba(200,169,110,0.3)] bg-[rgba(17,17,17,0.9)] px-3.5 py-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--text)] backdrop-blur-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_12px_24px_rgba(200,169,110,0.2)]"
      >
        Корзина ({cart.length})
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-[var(--border)] bg-[rgba(10,10,10,0.96)] p-6 backdrop-blur-xl transition duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Корзина</h3>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-[var(--border)] p-10 text-center text-[var(--muted)]">
            Корзина пока пустая
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="card-premium p-5">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.price}</p>

                <button
                  onClick={() => removeFromCart(index)}
                  className="mt-4 text-sm font-semibold text-red-400 transition hover:text-red-300"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--muted)]">Итого</span>
            <span className="text-2xl font-semibold text-[var(--accent)]">
              {total > 0 ? `${formatPrice(total)} ₸` : "по запросу"}
            </span>
          </div>

          <button onClick={handleCheckout} className="btn-primary mt-5 w-full">
            Оформить
          </button>
        </div>
      </aside>
    </>
  );
}