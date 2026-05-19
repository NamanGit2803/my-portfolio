'use client'

import Hero from "@/components/Hero";
import About from "@/components/About";
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Particles } from "@/components/ui/particles"
import MarqueeComponent from "@/components/Marquee";


export default function Home() {


  return (
    <div  className="cursor-none">
      <Hero />

      <About/>

      <SmoothCursor />
      <Particles className="absolute inset-0 z-0 opacity-15" color="#a1a1a1" />
    </div>
  );
}
