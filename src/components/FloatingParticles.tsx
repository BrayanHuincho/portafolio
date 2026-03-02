"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingParticles() {
    const particles = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15,
            opacity: Math.random() * 0.3 + 0.1,
            color: i % 3 === 0 ? "#6C63FF" : i % 3 === 1 ? "#00D4AA" : "#8B83FF",
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -30, 0, 20, 0],
                        x: [0, 15, -10, 5, 0],
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity, particle.opacity * 0.5, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Larger glowing orbs */}
            {[
                { x: "10%", y: "20%", size: 6, color: "#6C63FF" },
                { x: "85%", y: "30%", size: 5, color: "#00D4AA" },
                { x: "50%", y: "70%", size: 7, color: "#8B83FF" },
                { x: "25%", y: "80%", size: 4, color: "#00D4AA" },
                { x: "75%", y: "60%", size: 5, color: "#6C63FF" },
            ].map((orb, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full"
                    style={{
                        left: orb.x,
                        top: orb.y,
                        width: orb.size,
                        height: orb.size,
                        backgroundColor: orb.color,
                        boxShadow: `0 0 ${orb.size * 4}px ${orb.color}`,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 4 + i,
                        delay: i * 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
