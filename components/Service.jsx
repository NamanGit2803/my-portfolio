"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Sparkles, Boxes, Gauge } from "lucide-react";
import Magnetic from "./Magnetic";

const services = [
    {
        icon: Code2,
        title: "Web Development",
        desc: "Production-grade React, Next & TanStack apps with thoughtful architecture.",
        price: "from $4k",
    },
    {
        icon: Sparkles,
        title: "Motion & Interaction",
        desc: "GSAP scroll choreography, page transitions and delightful micro-interactions.",
        price: "from $2.5k",
    },
    {
        icon: Boxes,
        title: "3D & WebGL",
        desc: "Interactive Three.js / React Three Fiber experiences and product configurators.",
        price: "from $5k",
    },
    {
        icon: Gauge,
        title: "Performance Audits",
        desc: "Lighthouse 95+, Core Web Vitals and bundle-size deep dives with concrete fixes.",
        price: "from $1.5k",
    },
];

export default function Services() {
    const root = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".service-card", {
                y: 60,
                opacity: 0,
                scale: 0.94,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: root.current,
                    start: "top 75%",
                },
            });

            // Pin heading
            const heading = root.current?.querySelector(".services-heading");

            if (heading && window.matchMedia("(min-width: 768px)").matches) {
                ScrollTrigger.create({
                    trigger: root.current,
                    start: "top top+=80",
                    end: "bottom bottom",
                    pin: heading,
                    pinSpacing: false,
                });
            }

            // Heading animation
            gsap.fromTo(
                ".services-heading",
                {
                    letterSpacing: "-0.02em",
                },
                {
                    letterSpacing: "0em",
                    ease: "none",
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                    },
                }
            );
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="services"
            ref={root}
            className="relative p-20"
        >
            <div className="mx-auto">

                {/* Heading */}
                <div className="mb-20 font-logo services-heading">
                    <p className=" text-xl  mb-2">// Services</p>
                    <h2 className="text-5xl font-semibold  leading-none">
                        How I can{" "}
                        <span className="text-primary">help you ship</span>
                        .
                    </h2>
                    <div className="mt-4 h-px w-24 bg-linear-to-r from-primary to-transparent" />
                </div>

                {/* Cards */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <Magnetic
                                key={service.title}
                                className="service-card"
                                strength={0.15}
                                radius={140}
                                tilt
                            >
                                <div className="hover:border-primary group relative overflow-hidden rounded-2xl border border-border/25 bg-card/5 backdrop-blur-lg p-8 font-mono">

                                    {/* Glow */}
                                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/0 blur-3xl transition-all duration-700 group-hover:bg-primary/20" />

                                    {/* Icon */}
                                    <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                        <Icon className="h-6 w-6 hover-pop" />
                                    </div>

                                    {/* Title */}
                                    <div className="relative flex items-baseline justify-between">
                                        <h3 className="text-2xl font-semibold transition-colors">
                                            {service.title}
                                        </h3>

                                        <span className="text-sm text-primary-text">
                                            {service.price}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="relative mt-3 text-muted-foreground">
                                        {service.desc}
                                    </p>
                                </div>
                            </Magnetic>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}