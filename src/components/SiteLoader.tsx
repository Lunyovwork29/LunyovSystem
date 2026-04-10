"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_MS = 480;

export default function SiteLoader() {
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");

  useEffect(() => {
    const start = Date.now();
    const finish = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => setPhase("fade"), wait);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    return () => window.removeEventListener("load", finish);
  }, []);

  useEffect(() => {
    if (phase !== "fade") return;
    const t = window.setTimeout(() => setPhase("gone"), 600);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[var(--bg)] transition-opacity duration-[600ms] ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-busy={phase === "show"}
      aria-label="Загрузка"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-14 w-[120px]">
          <Image src="/brand-logo.svg" alt="" fill className="object-contain object-left" priority />
        </div>
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-[var(--border)]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    </div>
  );
}
