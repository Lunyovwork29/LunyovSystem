"use client";

import { useState } from "react";
import { TELEGRAM_URL, WHATSAPP_URL } from "@/config/contact";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `Новая заявка с сайта lunyovsystem.ru:

Имя: ${form.name}
Телефон: ${form.phone}
Комментарий: ${form.comment || "-"}`;

    try {
      await fetch("https://api.telegram.org/bot8615860403:AAFbmdt3JGBsJdbTvnXKjHOQOksieCH-ovQ/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: "-5264208747",
          text: message,
        }),
      });

      alert("Заявка отправлена");
      setForm({ name: "", phone: "", comment: "" });
    } catch (error) {
      console.error(error);
      alert("Ошибка отправки");
    }
  };

  return (
    <section id="contact" className="section-space border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="kicker">Контакты</div>
            <h2 className="section-title mt-6 text-[var(--text)]">Свяжитесь напрямую</h2>
            <p className="section-text mt-6">
              Напишите в мессенджер или оставьте заявку — отвечу и предложу следующий шаг: диагностика,
              аудит или пилот по CRM.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex flex-1 items-center justify-center gap-2 sm:min-w-[200px] sm:flex-none"
              >
                <span aria-hidden>WhatsApp</span>
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex flex-1 items-center justify-center gap-2 sm:min-w-[200px] sm:flex-none"
              >
                <span aria-hidden>Telegram</span>
              </a>
            </div>
          </div>

          <div className="card-premium p-6 md:p-8">
            <h3 className="text-lg font-semibold text-[var(--text)]">Форма заявки</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">Кратко опишите нишу и что хотите улучшить.</p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={form.name}
                onChange={handleChange}
                className="input-premium"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={form.phone}
                onChange={handleChange}
                className="input-premium"
                required
              />
              <textarea
                name="comment"
                placeholder="Комментарий"
                value={form.comment}
                onChange={handleChange}
                className="input-premium min-h-[120px]"
              />
              <button type="submit" className="btn-primary w-full">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
