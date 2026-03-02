import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative z-10">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
}
