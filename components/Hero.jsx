'use client'

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { TypingAnimation } from "@/components/ui/typing-animation"
import { RippleButton } from "@/components/ui/ripple-button"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import Globe from "@/components/Globe";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const Hero = () => {

    useGSAP(() => {
        // animation for text 
        gsap.fromTo("#intro .text",
            { opacity: 0, x: -150 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.5, ease: "power1.inOut" }
        );

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 1,
                pin: true,
            }
        })

        tl.to(".info, .cta, .hero-sub", {
            y: -40,          // move upward
            opacity: 0,       // optional fade
            stagger: 0.1,     // delay between each element
            ease: "power2.out"
        })

        tl.to(".globe", {
            x: () => {
                const el = document.querySelector(".globe");
                const rect = el.getBoundingClientRect();
                const centerOfScreen = window.innerWidth / 2;
                const elementCenter = rect.left + rect.width / 2;

                return centerOfScreen - elementCenter;
            },
            duration: 2,
        })

        tl.to(".globe", {
            opacity: 0,
            scale: 1.5,
            duration: 2,
        })
    })


    return (
        <section id="hero" className="h-[90dvh] flex flex-col justify-center gap-6 relative">

            {/* 🌍 Globe — Background Center-Right */}
            <div
                className="globe"
                style={{
                    position: 'absolute',
                    top: '-7%',
                    right: '5%',
                    opacity: 0.9,
                    zIndex: 0,
                }}>
                <Globe />
            </div>
            {/* about text  */}
            <div className="w-full flex flex-col gap-3">
                <div className="flex">
                    <div id="intro" className="relative left-28 leading-20 text-6xl">
                        <div className="text max-w-xl">
                            <h1 className="info">Hi,</h1>
                            <h1 className="info">I'm <span className="textGradient">Naman</span>,</h1>
                            <TypingAnimation
                                words={[
                                    "Full Stack Developer",
                                    "Next.js & MERN Developer",
                                    "Building Modern Web Apps",
                                    "Frontend + Backend Expert",
                                ]}
                                cursorStyle="underscore"
                                loop
                                className={"h-40 info"}
                            />
                        </div>

                        <p className="hero-sub max-w-xl text-lg text-muted-foreground">
                            I'm a creative developer blending 3D, motion, and code to build
                            interfaces that feel alive — for ambitious brands and founders.
                        </p>
                    </div>
                </div>

                {/* action button  */}
                <div className="flex w-full">
                    <div className="relative left-28 flex gap-4 cta">
                        <RippleButton className="bg-secondary text-black font-medium transition-all hover:-translate-y-1" rippleColor="#ADD8E6">View My Work</RippleButton>
                        <InteractiveHoverButton className='bg-transparent rounded-lg'>Start A Project</InteractiveHoverButton>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero