"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { HiExternalLink, HiCode } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import {
    SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
    SiTailwindcss, SiPython, SiMongodb, SiPostgresql,
    SiLaravel, SiPhp,
} from "react-icons/si";

const techIconMap: Record<string, { icon: React.ElementType; color: string }> = {
    "React": { icon: SiReact, color: "#61DAFB" },
    "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
    "TypeScript": { icon: SiTypescript, color: "#3178C6" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
    "Python": { icon: SiPython, color: "#FFD43B" },
    "MongoDB": { icon: SiMongodb, color: "#47A248" },
    "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
    "Laravel": { icon: SiLaravel, color: "#FF2D20" },
    "PHP": { icon: SiPhp, color: "#777BB4" },
};

const categories = ["Todos", "Web", "Mobile", "Backend", "SaaS"];

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Plataforma de comercio electrónico full-stack con pagos en tiempo real, panel de administración, gestión de inventario y analítica avanzada.",
        category: "SaaS",
        techs: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
        gradient: "from-[#6C63FF] to-[#4F46E5]",
        accent: "#6C63FF",
        stats: { stars: 128, views: "12k" },
        demo: "#",
        repo: "https://github.com",
    },
    {
        id: 2,
        title: "Dashboard Analytics",
        description: "Sistema de analítica con gráficas interactivas en tiempo real, reportes exportables y seguimiento de KPIs empresariales para equipos.",
        category: "Web",
        techs: ["React", "TypeScript", "Python", "MongoDB"],
        gradient: "from-[#00D4AA] to-[#059669]",
        accent: "#00D4AA",
        stats: { stars: 94, views: "8.5k" },
        demo: "#",
        repo: "https://github.com",
    },
    {
        id: 3,
        title: "API REST Microservices",
        description: "Arquitectura de microservicios escalable con autenticación JWT, rate limiting, caché Redis y documentación Swagger completa.",
        category: "Backend",
        techs: ["Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
        gradient: "from-[#F59E0B] to-[#D97706]",
        accent: "#F59E0B",
        stats: { stars: 215, views: "18k" },
        demo: "#",
        repo: "https://github.com",
    },
    {
        id: 4,
        title: "Sistema de Gestión",
        description: "ERP empresarial con módulos de RRHH, finanzas, inventario y reportes automatizados. Reducción del 60% en tiempo operativo.",
        category: "SaaS",
        techs: ["Laravel", "PHP", "React", "PostgreSQL"],
        gradient: "from-[#8B83FF] to-[#6C63FF]",
        accent: "#8B83FF",
        stats: { stars: 67, views: "5k" },
        demo: "#",
        repo: "https://github.com",
    },
    {
        id: 5,
        title: "Portfolio Builder",
        description: "Herramienta SaaS para crear portafolios profesionales sin código. Más de 30 templates premium, dominio personalizado y analytics.",
        category: "Web",
        techs: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
        gradient: "from-[#EC4899] to-[#BE185D]",
        accent: "#EC4899",
        stats: { stars: 183, views: "22k" },
        demo: "#",
        repo: "https://github.com",
    },
    {
        id: 6,
        title: "AI Chat Application",
        description: "Aplicación de chat con inteligencia artificial, soporte para múltiples modelos de lenguaje, historial persistente y personalización avanzada.",
        category: "SaaS",
        techs: ["Next.js", "Python", "TypeScript", "MongoDB"],
        gradient: "from-[#14B8A6] to-[#0F766E]",
        accent: "#14B8A6",
        stats: { stars: 342, views: "31k" },
        demo: "#",
        repo: "https://github.com",
    },
];

export default function Projects() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const filtered =
        activeCategory === "Todos"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="relative py-20 px-6" ref={ref}>
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(139,131,255,0.1)] border border-[rgba(139,131,255,0.2)] text-[#8B83FF] text-sm font-medium mb-4">
                        Proyectos
                    </span>
                    <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${isLight ? "text-slate-800" : "text-white"}`}>
                        Proyectos{" "}
                        <span className="gradient-text">Realizados</span>
                    </h2>
                    <div className="flex justify-center mb-4">
                        <div className="section-divider" />
                    </div>
                </motion.div>

                {/* Category filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                    ? "bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] text-white shadow-[0_0_20px_rgba(108,99,255,0.3)]"
                                    : isLight
                                        ? "bg-white/60 border border-[rgba(108,99,255,0.15)] text-slate-500 hover:text-slate-800 hover:border-[rgba(108,99,255,0.4)]"
                                        : "bg-[rgba(17,24,39,0.6)] border border-[rgba(108,99,255,0.1)] text-gray-400 hover:text-white hover:border-[rgba(108,99,255,0.3)]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="glass-card relative overflow-hidden group cursor-pointer"
                        >
                            {/* Top gradient bar */}
                            <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

                            {/* Card visual */}
                            <div className="relative h-40 overflow-hidden">
                                {/* Abstract design preview */}
                                <div className={`absolute inset-0 ${isLight ? "bg-gradient-to-br from-[rgba(240,242,255,0.95)] to-[rgba(230,235,255,0.98)]" : "bg-gradient-to-br from-[rgba(17,24,39,0.9)] to-[rgba(3,7,18,0.95)]"}`} />
                                <div
                                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(ellipse at center, ${project.accent} 0%, transparent 70%)`,
                                    }}
                                />
                                {/* Floating tech icons in the preview */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-32 h-32">
                                        {project.techs.slice(0, 4).map((tech, ti) => {
                                            const T = techIconMap[tech];
                                            if (!T) return null;
                                            const positions = [
                                                { top: "0%", left: "50%", transform: "translateX(-50%)" },
                                                { top: "50%", right: "0%", transform: "translateY(-50%)" },
                                                { bottom: "0%", left: "50%", transform: "translateX(-50%)" },
                                                { top: "50%", left: "0%", transform: "translateY(-50%)" },
                                            ];
                                            return (
                                                <motion.div
                                                    key={tech}
                                                    className={`absolute w-9 h-9 rounded-xl border flex items-center justify-center ${isLight
                                                            ? "bg-white/90 border-[rgba(108,99,255,0.12)]"
                                                            : "bg-[rgba(17,24,39,0.8)] border-[rgba(255,255,255,0.05)]"
                                                        }`}
                                                    style={positions[ti] as React.CSSProperties}
                                                    animate={
                                                        hoveredId === project.id
                                                            ? { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 + ti * 0.3 } }
                                                            : {}
                                                    }
                                                >
                                                    <T.icon size={18} style={{ color: T.color }} />
                                                </motion.div>
                                            );
                                        })}
                                        {/* Center icon */}
                                        <div
                                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}
                                        >
                                            <HiCode className="text-white" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Category badge */}
                                <div className="absolute top-3 right-3">
                                    <span
                                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                        style={{
                                            backgroundColor: `${project.accent}15`,
                                            color: project.accent,
                                            border: `1px solid ${project.accent}30`,
                                        }}
                                    >
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card content */}
                            <div className="p-6">
                                <h3 className={`text-lg font-bold mb-2 transition-all duration-300 ${isLight ? "text-slate-800 group-hover:text-[#6C63FF]" : "text-white"}`}>
                                    {project.title}
                                </h3>
                                <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${isLight ? "text-slate-500" : "text-gray-500"}`}>
                                    {project.description}
                                </p>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {project.techs.map((tech) => {
                                        const T = techIconMap[tech];
                                        return (
                                            <span
                                                key={tech}
                                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border ${isLight
                                                        ? "bg-[rgba(108,99,255,0.05)] border-[rgba(108,99,255,0.12)] text-slate-600"
                                                        : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] text-gray-400"
                                                    }`}
                                            >
                                                {T && <T.icon size={11} style={{ color: T.color }} />}
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Stats & Links */}
                                <div className="flex items-center justify-between">
                                    <div className={`flex items-center gap-3 text-xs ${isLight ? "text-slate-400" : "text-gray-600"}`}>
                                        <span>⭐ {project.stats.stars}</span>
                                        <span>👁 {project.stats.views}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-2 rounded-lg border transition-all duration-200 ${isLight
                                                    ? "bg-white/60 border-slate-200 text-slate-500 hover:text-[#6C63FF] hover:border-[rgba(108,99,255,0.4)]"
                                                    : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.05)] text-gray-400 hover:text-white hover:border-[rgba(108,99,255,0.3)]"
                                                }`}
                                        >
                                            <FaGithub size={15} />
                                        </a>
                                        <a
                                            href={project.demo}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${project.accent}CC, ${project.accent}88)`,
                                                boxShadow: `0 4px 15px ${project.accent}20`,
                                            }}
                                        >
                                            Ver demo
                                            <HiExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Hover glow border */}
                            <div
                                className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    boxShadow: `inset 0 0 30px ${project.accent}10`,
                                    border: `1px solid ${project.accent}25`,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View more CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl border font-medium transition-all duration-300 ${isLight
                                ? "border-[rgba(108,99,255,0.2)] text-slate-600 hover:text-[#6C63FF] hover:border-[rgba(108,99,255,0.5)] hover:bg-white/50"
                                : "border-[rgba(108,99,255,0.2)] text-gray-300 hover:text-white hover:border-[rgba(108,99,255,0.5)] hover:bg-[rgba(108,99,255,0.05)]"
                            }`}
                    >
                        <FaGithub size={18} />
                        Ver todos los proyectos en GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
