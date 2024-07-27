import Contact from "@/components/custom/Contact";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
import HowItWorks from "@/components/custom/HowItWorks";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
}
