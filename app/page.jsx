'use client'

import Hero from "@/components/Hero";
import About from "@/components/About";
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Particles } from "@/components/ui/particles"
import ProjectsSection from "@/components/Projects";
import Services from "@/components/Service";


export default function Home() {


  return (
    <div id="home" className="cursor-none">
      <Hero />

      <section id="about">
        <About />
      </section>

      <section id="project">
        <ProjectsSection />
      </section>

      <section id="service">
        <Services/>
      </section>


      <SmoothCursor />
      <Particles className="absolute inset-0 z-0 opacity-15" color="#a1a1a1" />
    </div>
  );
}
