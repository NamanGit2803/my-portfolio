"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronRight, Menu } from 'lucide-react';
import Magnetic from "../Magnetic";

const links = [
    { label: "Projects", href: "#project" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#service" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", onScroll);

        // 🔥 GSAP animation (navbar reveal on load)
        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(".links",
            {
                opacity: 0,
                y: -20,
            },
            {
                opacity: 1,
                y:0,
                duration: 1,
                ease: "power1.out",
                stagger: 0.2,
            }
        )

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            ref={navRef}
            className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"
                }`}
        >
            <div className="mx-auto max-w-6xl px-6">
                <nav
                    className={`flex items-center justify-between rounded-full px-6 py-3 transition-all ${scrolled ? "glass backdrop-blur-md bg-white/5" : ""
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="logo flex gap-1.5 items-center w-[10%] xs:w-[40%]">
                        <div className='sm:w-7.5 xs:w-7 h-5 bg-linear-to-bl from-slate-50 via-slate-100 to-slate-50 rounded-[1px]'>
                            <ChevronRight className='text-black w-[1.3rem]' />
                        </div>
                        <p className="text-2xl tracking-wider">NJ</p>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden items-center gap-8 md:flex">
                        {links.map((l) => (
                            <li key={l.href} className="links">
                                <Link
                                    href={l.href}
                                    className="inline-block relative text-sm text-muted-foreground transition-all duration-300 hover:text-primary-foreground hover:-translate-y-1 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <div
                        className="inline-block"
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1.1,
                                duration: 0.3,
                                ease: "power2.out",
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1,
                                duration: 0.3,
                            });
                        }}
                    >
                        <Magnetic strength={0.25}>
                            <a
                                href="#contact"
                                className="inline-block rounded-full bg-secondary px-5 py-2 text-sm font-medium text-background"
                            >
                                Let's talk
                            </a>
                        </Magnetic>
                    </div>
                </nav>
            </div>
        </div>
    );
}