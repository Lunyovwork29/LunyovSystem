import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import About from "@/components/About";
import Cases from "@/components/Cases";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Cart from "@/components/Cart";
import Articles from "@/components/Articles";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Hero />
      <PainPoints />
      <About />
      <Cases />
      <Services />
      <Process />
      <Articles />
      <Contact />
      <AdminPanel />
      <Cart />
    </main>
  );
}