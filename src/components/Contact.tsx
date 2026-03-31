"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `Новая заявка с сайта:

Имя: ${form.name}
Телефон: ${form.phone}
Комментарий: ${form.comment || "-"}`;

    try {
      await fetch("https://api.telegram.org/bot8615860403:AAFbmdt3JGBsJdbTvnXKjHOQOksieCH-ovQ/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <section id="contact" className="section-space border-t border-[var(--border)]">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <div className="kicker">Контакт</div>
          <h2 className="section-title mt-6">Разберём ваш отдел продаж</h2>
          <p className="section-text mt-6">
            Оставьте заявку — я разберу вашу ситуацию и покажу, где именно вы
            теряете деньги и что нужно сделать в первую очередь.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl card-premium p-6 md:p-8">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={form.name}
              onChange={handleChange}
              className="input-premium"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Телефон / WhatsApp"
              value={form.phone}
              onChange={handleChange}
              className="input-premium"
              required
            />

            <textarea
              name="comment"
              placeholder="Коротко опишите ситуацию"
              value={form.comment}
              onChange={handleChange}
              className="input-premium"
            />

            <button type="submit" className="btn-primary mt-2 w-full">
              Оставить заявку
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}