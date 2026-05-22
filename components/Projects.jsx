"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BorderBeam } from "@/components/ui/border-beam";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA — replace with your real projects ───────────────────────────────────
const PROJECTS = [
  {
    id: 0,
    title: "Stampi",
    desc: "Stampi is a modern SaaS loyalty platform that helps local businesses manage customer rewards, engagement, and analytics through a clean digital experience.",
    tags: ["Next.js", "Prisma", "Saas", "Supabase"],
    image: "/assets/stampi-project.png",
    live: "https://stampi.in",
  },
  {
    id: 1,
    title: "Digihub",
    desc: "DigitalHub is a modern digital marketplace where creators and entrepreneurs can sell digital products like ebooks, notes, templates, prompts, courses, and more.",
    tags: ["Next.js", "MySql", "ShadcnUi", "Prisma"],
    image: "/assets/digihub.png",
    github: "https://github.com/NamanGit2803/digihub",
    live: "https://digihub-nine.vercel.app/",
  },
  {
    id: 2,
    title: "Kyal Misthan Bhandar",
    desc: "Kyalji is a modern premium mithai brand website inspired by Rajasthan’s royal heritage, designed to showcase handcrafted traditional sweets with an elegant digital experience.",
    tags: ["Next.js", "ShadcnUi", "WhatsApp Ordering"],
    image: "/assets/kmb.png",
    github: "https://github.com/yourusername/gsap-kit",
    live: "https://www.kyalmisthanbhandar.com",
  },
  {
    id: 3,
    title: "Localift",
    desc: "Localift is a Saas platform for local grocery store to sell product online within area. It is designed to grow local grocery business to compete blinkit.",
    tags: ["Next.js", "MongoDB", "Mui", "E-Commerce"],
    image: "/assets/localift.png",
    github: "https://github.com/NamanGit2803/Localift",
  },
  {
    id: 4,
    title: "Indian Stonex",
    desc: "Indian Stonex is a premium stone craftsmanship and architectural brand specializing in timeless temple structures, intricate carvings, and heritage-inspired stone designs.",
    tags: ["Next.js", "Whatsapp integration", "ShadcnUi"],
    image: "/assets/is.png",
    live: "https://www.indianstonex.com/",
  },
  {
    id: 5,
    title: "EduVibe - E Learning PLatform",
    desc: "Eduvibe is a modern e-learning platform designed to provide interactive online learning experiences through courses, video lessons, and digital study resources.",
    tags: ["Python", "FastAPI", "React", "Vision API"],
    image: "/assets/eduvibe.png",
    github: "https://github.com/NamanGit2803/Eduvibe",
  },
];



// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 12,
      rotateX: -y * 10,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 700,
    });
  };
  const handleLeave = () =>
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1,.7)",
    });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="project-card group relative rounded-2xl border border-white/10 bg-white/[.035]
        hover:border-white/20 transition-colors duration-300 cursor-pointer overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* MagicUI: shimmer border beam on hover */}
      <BorderBeam
        size={180}
        duration={6}
        colorFrom={"#381e9f"}
        colorTo="transparent"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Thumbnail */}
      <div className="relative h-45 flex items-center justify-center overflow-hidden">
        <Image src={project.image} fill className="w-full bg-cover" alt={project.title} />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2.5 px-5 py-4 flex-1">
        <h3 className="text-[15px] font-mono ">{project.title}</h3>
        <p className="text-[12px] text-white/50 leading-[1.75] font-sans">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-md font-mono
                bg-white/5.5 text-white/40 border border-white/9"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 pb-4 pt-3 border-t border-white/[.07]">
        <div className="flex gap-2">
          {project.github && (
            <Magnetic strength={0.1}>
              <Link
                target="_blank"
                href={project.github}
                className="flex items-center gap-1.5 text-[11px] font-mono
              text-white/50 hover:text-white px-2.5 py-1.5 rounded-lg
              border border-white/10 bg-white/4 hover:bg-white/9
              hover:border-white/25 transition-all duration-200"
              >
                <FiGithub />
                github
              </Link>
            </Magnetic >
          )}

          {project.live && (
            <Magnetic strength={0.1}>
              <Link
                target="_blank"
                href={project.live}
                className="flex items-center gap-1.5 text-[11px] font-mono
                text-white/50 hover:text-white px-2.5 py-1.5 rounded-lg
                border border-white/10 bg-white/4 hover:bg-white/9
                hover:border-white/25 transition-all duration-200"
              >
                <FiExternalLink />
                live
              </Link>
            </Magnetic>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat === activeFilter);

  // Animate cards when filter changes
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" }
    );
  }, [activeFilter]);

  // Initial scroll-in animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-header > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-header", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".filter-btn",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: ".filter-btn", start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative p-20 overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Radial glow top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%,rgba(124,58,237,.12),transparent)",
        }}
      />

      <div className="relative mx-auto">
        {/* Header */}
        <div className="proj-header mb-12">
          <p className="text-2xl font-logo  mb-2">// MY_WORK</p>
          <h2 className="text-5xl font-semibold font-logo">
            Featured{" "}
            <span className="text-primary">Projects</span>
          </h2>
          <div className="mt-4 h-0.5 w-14 rounded-full bg-linear-to-r from-primary to-transparent" />
          <p className="mt-4 text-sm text-white/40 font-sans leading-relaxed max-w-lg">
            Things I've built — from idea to deployment. Each project is a different
            chapter of what I know and love.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

      </div>
    </section>
  );
}