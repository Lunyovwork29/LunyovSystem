export default function About() {
  return (
    <section id="about" className="section-space border-t border-[var(--border)]">
      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <div className="photo-shell">
              <div className="photo-placeholder">Твоё фото</div>
              <div className="absolute bottom-5 right-5 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-black">
                Практик, не теоретик
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="kicker">Обо мне</div>
            <h2 className="section-title mt-6">Кто будет настраивать вам продажи</h2>

            <p className="section-text mt-6">
              Я не теоретик и не “консультант с красивой презентацией”.
              Я практик, который строит отделы продаж, внедряет CRM и выстраивает
              систему, где каждый менеджер понимает, что делать, как продавать и
              где именно контролируется результат.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="card-premium p-6">
                <div className="number-accent">+120 млн ₸</div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  выручки через внедрение систем продаж
                </p>
              </div>

              <div className="card-premium p-6">
                <div className="number-accent">20+ проектов</div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  в нишах от услуг до товарки
                </p>
              </div>

              <div className="card-premium p-6">
                <div className="number-accent">x2–x5</div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  рост после внедрения системы
                </p>
              </div>

              <div className="card-premium p-6">
                <div className="number-accent">7 лет</div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  опыта в продажах и управлении
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}