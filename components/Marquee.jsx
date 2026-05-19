'use client'

import { Marquee } from "@/components/ui/marquee"

const techStack = [
    "Next.js",
    "React",
    "Supabase",
    "Node.js",
    "Tailwind CSS",
    "GSAP",
    "Three.js",
    "MongoDB",
    "Firebase",
    "Vercel",
];

const TechCard = ({ name }) => {
    return (
        <div className=" whitespace-nowrap mx-50">
            {name}
        </div>
    );
};

const MarqueeComponent = () => {
    return (
        <div className="relative w-full overflow-hidden" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
            <Marquee  className="[--duration:20s] marquee">
                {techStack.map((tech, index) => (
                    <TechCard key={index} name={tech} />
                ))}
            </Marquee>
        </div>
    )
}

export default MarqueeComponent