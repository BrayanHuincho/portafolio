"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "./ThemeProvider";
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
    SiPython, SiPostgresql, SiMongodb, SiDocker, SiGit,
    SiGraphql, SiRedux, SiPrisma, SiFigma, SiAmazonwebservices,
    SiVuedotjs, SiLaravel, SiPhp, SiMysql, SiLinux,
} from "react-icons/si";

const techCategories = [
    {
        label: "Frontend",
        color: "#6C63FF",
        techs: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Vue.js", icon: SiVuedotjs, color: "#42B883" },
            { name: "Redux", icon: SiRedux, color: "#764ABC" },
        ],
    },
    {
        label: "Backend",
        color: "#00D4AA",
        techs: [
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Python", icon: SiPython, color: "#FFD43B" },
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
            { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
            { name: "GraphQL", icon: SiGraphql, color: "#E535AB" },
            { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
        ],
    },
    {
        label: "Bases de Datos",
        color: "#F59E0B",
        techs: [
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        ],
    },
    {
        label: "DevOps & Tools",
        color: "#8B83FF",
        techs: [
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Linux", icon: SiLinux, color: "#FCC624" },
            { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        ],
    },
];

export default function TechStack() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    return (
        <section id="tech" className="relative py-20 overflow-hidden" ref={ref}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(108,99,255,0.02)] to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.2)] text-[#00D4AA] text-sm font-medium mb-4">
                        Stack Tecnológico
                    </span>
                    <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isLight ? "text-slate-800" : "text-white"}`}>
                        Las herramientas que{" "}
                        <span className="gradient-text">domino</span>
                    </h2>
                    <div className="flex justify-center">
                        <div className="section-divider" />
                    </div>
                </motion.div>

                {/* Categories grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {techCategories.map((category, catI) => (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.2 + catI * 0.08 }}
                            className="glass-card p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: category.color, boxShadow: `0 0 8px ${category.color}` }}
                                />
                                <h3 className={`text-sm font-semibold ${isLight ? "text-slate-700" : "text-gray-300"}`}>
                                    {category.label}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {category.techs.map((tech, i) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.3 + catI * 0.08 + i * 0.04 }}
                                        whileHover={{ x: 4 }}
                                        className={`flex items-center gap-2.5 py-1.5 px-2.5 rounded-lg transition-colors cursor-default group ${isLight
                                                ? "hover:bg-[rgba(108,99,255,0.07)]"
                                                : "hover:bg-[rgba(108,99,255,0.08)]"
                                            }`}
                                    >
                                        <tech.icon
                                            size={16}
                                            style={{ color: tech.color }}
                                            className="flex-shrink-0"
                                        />
                                        <span className={`text-sm font-medium transition-colors ${isLight
                                                ? "text-slate-600 group-hover:text-slate-900"
                                                : "text-gray-400 group-hover:text-gray-200"
                                            }`}>
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
