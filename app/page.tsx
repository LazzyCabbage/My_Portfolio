import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import VisitorCounter from "@/components/VisitorCounter";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col w-full selection:bg-[var(--accent)] selection:text-white">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <VisitorCounter />
      <Contact />
    </main>
  );
}
