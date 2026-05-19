"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlareHover } from "@/components/ui/glare-hover"

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────────────────

const experiences = [
    {
        type: "work",
        year: "2026 – Present",
        title: "Full-Stack Developer",
        org: "Freelance / Self-Employed",
        desc: "Building end-to-end web applications for clients across SaaS, e-commerce, and portfolio domains using Next.js, React, and Node.js.",
        tags: ["Next.js", "GSAP", "MERN", "Saas"],
    },
    {
        type: "work",
        year: "July 2025 – December 2025",
        title: "Software Developer Intern",
        org: "Cnel India",
        desc: "Developed responsive dashboards and landing pages, implemented GSAP animations, and collaborated in agile sprints.",
        tags: ["React", "Node.js", "Laravel", "REST API"],
    },
    {
        type: "edu",
        year: "2021 – 2025",
        title: "B.Tech — Computer Science",
        org: "Global Institute of Technology",
        desc: "Core focus on Data Structures, Web Technologies, and Software Engineering. Learn web development from self.",
        tags: ["DSA", "DBMS", "OS", "AI"],
    },
];

const skillGroups = [
    {
        label: "Frontend",
        color: "#61DAFB",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    },
    {
        label: "Backend",
        color: "#68D391",
        skills: ["Node.js", "Express", "REST API", "Laravel", "Prisma",],
    },
    {
        label: "Database",
        color: "#F6AD55",
        skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis", "Supabase"],
    },
    {
        label: "Tools & DevOps",
        color: "#B794F4",
        skills: ["Git", "GitHub", "Vercel", "VS Code",],
    },
];

// ─── ICON dot ────────────────────────────────────────────────────────────────

function Dot({ type }) {
    return (
        <div
            className="timeline-dot relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 transition-all duration-300"
            style={{
                borderColor: type === "work" ? "#381e9f" : "#1350d7",
                background: "rgba(0,0,0,0.8)",
                boxShadow: `0 0 12px ${type === "work" ? "#7C3AED55" : "#1350d7"}`,
            }}
        >
            {type === "work" ? (
                // briefcase icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={"#846de3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
            ) : (
                // graduation cap icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1350d7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            )}
        </div>
    );
}

// ─── TIMELINE CARD ───────────────────────────────────────────────────────────

function TimelineCard({ item, index }) {
    const isLeft = index % 2 === 0;

    return (
        <div
            className={`timeline-card relative flex items-start gap-6 mb-14 ${isLeft ? "flex-row" : "flex-row-reverse"
                }`}
            data-index={index}
        >
            {/* Card */}
            <div
                className={`group flex-1 p-5 rounded-xl border border-border/20 bg-white/[0.03] backdrop-blur-sm font-mono
          hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 cursor-default
          ${isLeft ? "text-left" : "text-right"}`}
                style={{ maxWidth: "420px", [isLeft ? "marginLeft" : "marginRight"]: "auto" }}
            >
                <div className={`flex items-center gap-2 mb-2 ${isLeft ? "" : "justify-end"}`}>
                    <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full border"
                        style={{
                            color: item.type === "work" ? "#846de3" : "#1350d7",
                            borderColor: item.type === "work" ? "#381e9f" : "#1350d7",
                            background: item.type === "work" ? "#7C3AED11" : "#2563EB11",
                        }}
                    >
                        {item.type === "work" ? "// work" : "// edu"}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{item.year}</span>
                </div>

                <h3 className="text-base font-bold mb-0.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground/70 mb-3">{item.org}</p>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>

                <div className={`flex flex-wrap gap-1.5 ${isLeft ? "" : "justify-end"}`}>
                    {item.tags.map((t) => (
                        <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded font-mono"
                            style={{ background: "#ffffff0a", color: "#ffffff55", border: "1px solid #ffffff15" }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Dot on center line */}
            <Dot type={item.type} />

            {/* Spacer for other side */}
            <div className="flex-1" style={{ maxWidth: "420px" }} />
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Journey() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const lineTrackRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll-fill the vertical line
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: lineTrackRef.current,
                        start: "top 60%",
                        end: "bottom 60%",
                        scrub: 0.5,
                    },
                }
            );

            // Animate cards in
            gsap.utils.toArray(".timeline-card").forEach((card, i) => {
                const isLeft = i % 2 === 0;
                gsap.fromTo(
                    card,
                    { opacity: 0, x: isLeft ? -40 : 40 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Animate dots
            gsap.utils.toArray(".timeline-dot").forEach((dot) => {
                gsap.fromTo(
                    dot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: dot,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Animate skill cards
            gsap.utils.toArray(".skill-group").forEach((group, i) => {
                gsap.fromTo(
                    group,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: group,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative p-20 overflow-hidden"
            style={{ background: "#0a0a0a" }}
        >
            {/* Subtle grid background */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative mx-auto">

                {/* ── Section header ── */}
                <div className="mb-20 font-logo">
                    <p className=" text-xl  mb-2">// MY_JOURNEY</p>
                    <h2 className="text-5xl font-semibold  leading-none">
                        Experience &amp;{" "}
                        <span className="text-primary">Education</span>
                    </h2>
                    <div className="mt-4 h-px w-24 bg-linear-to-r from-primary to-transparent" />
                </div>

                {/* ── Timeline ── */}
                <div ref={lineTrackRef} className="relative">

                    {/* Center line track (gray) */}
                    <div
                        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                    />

                    {/* Color fill line (animated) */}
                    <div
                        ref={lineRef}
                        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
                        style={{
                            background: "linear-gradient(to bottom, #7C3AED, #2563EB, #7C3AED)",
                            scaleY: 0,
                            boxShadow: "0 0 8px #7C3AED88",
                        }}
                    />

                    {/* Cards */}
                    <div className="relative">
                        {experiences.map((item, i) => (
                            <TimelineCard key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>


                {/* ── Skills ── */}
                <div className="mt-32">
                    <p className="font-logo text-2xl mb-2">// WHAT_I_USE</p>
                    <h2 className="text-5xl font-logo font-semibold mb-12">
                        My <span className="text-primary">Skills</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {skillGroups.map((group) => (

                            <GlareHover
                            opacity={0.35}
                                key={group.label}
                                className="skill-group p-6 rounded-2xl border border-white/10 bg-white/3 hover:border-white/20 transition-all duration-300 w-full h-full flex flex-col items-start"
                            >
                                <div className="flex items-center gap-2 mb-5">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                                    />
                                    <span className="text-sm font-mono font-bold" style={{ color: group.color }}>
                                        {group.label}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="group/skill relative px-3 py-1.5 text-sm font-mono text-white/70
                        rounded-lg border border-white/10 bg-white/[0.03] hover:border-white/30
                        hover:text-white cursor-default transition-all duration-200 overflow-hidden"
                                        >
                                            <span
                                                className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                                                style={{
                                                    background: `linear-gradient(135deg, ${group.color}18, transparent)`,
                                                }}
                                            />
                                            <span className="relative">{skill}</span>
                                        </span>
                                    ))}
                                </div>
                            </GlareHover>
                        ))}
                    </div>
                </div>



            </div>
        </section>
    );
}