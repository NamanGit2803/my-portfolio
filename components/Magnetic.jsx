"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic wrapper: the child element follows the pointer with spring physics,
 * snapping back when the cursor leaves its influence radius.
 */
export default function Magnetic({
    children,
    strength = 0.35,
    radius = 120,
    stiffness = 0.15,
    damping = 0.72,
    tilt = false,
    className = "",
    as: Tag = "div",
}) {
    const wrapRef = useRef(null);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        // Respect reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let target = { x: 0, y: 0 };
        let current = { x: 0, y: 0 };
        let velocity = { x: 0, y: 0 };

        let rotX = 0,
            rotY = 0,
            rotXTarget = 0,
            rotYTarget = 0;

        let raf = 0;
        let active = true;

        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            const dist = Math.hypot(dx, dy);
            const reach = Math.max(r.width, r.height) / 2 + radius;

            if (dist < reach) {
                const falloff = 1 - dist / reach;

                target.x = dx * strength * falloff;
                target.y = dy * strength * falloff;

                if (tilt) {
                    rotYTarget = (dx / r.width) * 12 * falloff;
                    rotXTarget = -(dy / r.height) * 12 * falloff;
                }
            } else {
                target.x = 0;
                target.y = 0;
                rotXTarget = 0;
                rotYTarget = 0;
            }
        };

        const onLeave = () => {
            target.x = 0;
            target.y = 0;
            rotXTarget = 0;
            rotYTarget = 0;
        };

        const tick = () => {
            // Spring physics
            const ax = (target.x - current.x) * stiffness;
            const ay = (target.y - current.y) * stiffness;

            velocity.x = (velocity.x + ax) * damping;
            velocity.y = (velocity.y + ay) * damping;

            current.x += velocity.x;
            current.y += velocity.y;

            rotX += (rotXTarget - rotX) * 0.12;
            rotY += (rotYTarget - rotY) * 0.12;

            el.style.transform = tilt
                ? `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(
                    2
                )}px, 0) perspective(800px) rotateX(${rotX.toFixed(
                    2
                )}deg) rotateY(${rotY.toFixed(2)}deg)`
                : `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(
                    2
                )}px, 0)`;

            if (active) raf = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        el.addEventListener("mouseleave", onLeave);

        raf = requestAnimationFrame(tick);

        return () => {
            active = false;
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
            el.style.transform = "";
        };
    }, [strength, radius, stiffness, damping, tilt]);

    return (
        <Tag
            ref={wrapRef}
            className={className}
            style={{
                display: Tag === "span" ? "inline-block" : undefined,
                willChange: "transform",
            }}
        >
            {children}
        </Tag>
    );
}