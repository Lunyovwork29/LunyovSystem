import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import TrustStats from "@/components/TrustStats";
import Cases from "@/components/Cases";
import Services from "@/components/Services";
import ProductCTA from "@/components/ProductCTA";
import Contact from "@/components/Contact";
import Cart from "@/components/Cart";
import AdminPanel from "@/components/AdminPanel";
import SiteLoader from "@/components/SiteLoader";

export default function Home() {
  return (
    <>
      <SiteLoader />
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Hero />
        <LogoMarquee />
        <TrustStats />
        <Cases />
        <Services />
        <ProductCTA />
        <Contact />
        <AdminPanel />
        <Cart />
      </main>
    </>
  );
}
