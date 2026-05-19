'use client'

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AuroraText } from "@/components/ui/aurora-text"
import { IconCloud } from "@/components/ui/icon-cloud"
import Journey from "./about/Journey";
import { section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger)

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "vercel",
  "git",
  "github",
  "gsap",
  "supabase",
  "laravel",
  "mysql",
  "shadcnui",
  "tailwindcss",
  "bootstrap",
]

const content = [
  "I'm",
  { text: "Naman", className: "text-primary-text font-medium" },
  ", a full-stack developer living at the intersection of",
  { text: "logic and creativity", className: "text-primary-text font-medium" },
  ". I craft digital experiences that don't just work — they",
  { text: "feel alive", className: "text-primary-text font-medium" },
  ". From pixel-perfect UIs to robust backend systems, I bring ideas from concept to production with",
  { text: "Next.js, React.js, GSAP,", className: "text-primary-text font-medium" },
  "and everything in between."
];


const About = () => {

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )

  useGSAP(() => {

    gsap.from(".reveal-word", {
      opacity: 0.1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".ab-bio",
        start: "top 80%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',

        once: true,
      }

    })

    tl.fromTo(".firstTitle",
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.05,
      }
    )

    tl.fromTo(".secondTitle, .code",
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.05,
        ease: "power2.out",
      }
    )

    tl.fromTo(".ab-avail",
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
    )

    tl.fromTo(".cloudIcon",
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1.3, duration: 0.4, ease: "back.out(2)" },
    )

  })

  return (
    <section className="min-h-dvh ">
      <div className="p-20 grid grid-cols-2" id="about">
        <div className="flex flex-col gap-8">
          {/* title  */}
          <div className="flex flex-col gap-4 font-logo">
            <h3 className=" text-2xl tracking-widest firstTitle">
              {"// WHO_AM_I".split("").map((char, i) => (
                <span key={i} className="firstTitle inline-block">
                  {char}
                </span>
              ))}
            </h3>
            <div className="flex flex-col gap-2">
              <h2 className="text-6xl font-semibold flex gap-3 ">
                {["I", "think"].map((word, i) => (
                  <span key={i} className="secondTitle inline-block">
                    {word}
                  </span>
                ))}

                <span className="secondTitle inline-block">
                  <AuroraText>in code.</AuroraText>
                </span>
              </h2>
              <p className="[word-spacing:5px] text-muted-foreground code">
                <span className="text-primary">const</span> naman = <span className="text-primary">new</span> Developer {`({ passion: `}<span className="text-primary-text">Infinity</span> {` })`}
              </p>
            </div>
          </div>

          {/* button  */}
          <div className="ab-avail mb-10 inline-flex items-center gap-2 rounded-full border border-border/20 bg-primary/[0.07] px-4 py-1.5 w-58">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-text" />
            <span className="text-sm font-semibold tracking-wide text-primary-text">
              Open to opportunities
            </span>
          </div>

          {/* details  */}
          <div>
            <p className="ab-bio mb-8 max-w-xl text-xl leading-[1.9] text-muted-foreground">
              {content.map((item, i) => {
                if (typeof item === "string") {
                  return item.split(" ").map((word, j) => (
                    <span key={`${i}-${j}`} className="reveal-word inline-block mr-2">
                      {word}
                    </span>
                  ));
                }

                return (
                  <span key={i} className={`reveal-word inline-block mr-2 ${item.className}`}>
                    {item.text}
                  </span>
                );
              })}
            </p>
          </div>
        </div>


        <div className="flex justify-center items-center">
          <div className="relative overflow-hidden scale-130 cloudIcon">
            <IconCloud images={images} />
          </div>
        </div>
      </div>

      <Journey/>
    </section>
  )
}

export default About