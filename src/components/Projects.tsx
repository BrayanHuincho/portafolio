"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { HiExternalLink, HiCode, HiX, HiCheckCircle } from "react-icons/hi";
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
        problem: "Manejo de inventario inconsistente y carritos abandonados debido a procesos de pago lentos en la antigua plataforma.",
        solution: "Arquitectura Headless con Next.js, caché en el borde y procesos en segundo plano para pagos asíncronos.",
        achievements: ["Reducción del 40% en tiempo de carga de página", "Aumento del 25% en conversión de pagos", "Gestión de +10k SKUs sin caída de rendimiento"],
        category: "SaaS",
        techs: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
        gradient: "from-[#6C63FF] to-[#4F46E5]",
        accent: "#6C63FF",
        stats: { stars: 128, views: "12k" },
        demo: "https://demo-ecommerce.example.com",
        repo: "https://github.com",
    },
    {
        id: 2,
        title: "Dashboard Analytics",
        description: "Sistema de analítica con gráficas interactivas en tiempo real, reportes exportables y seguimiento de KPIs empresariales para equipos.",
        problem: "Equipos reportaban retrasos de hasta 24h en la generación de reportes financieros por consultas SQL masivas.",
        solution: "Implementación de base de datos analítica con pre-agregación en MongoDB y WebSockets para datos en vivo.",
        achievements: ["Reportes en menos de 2 segundos", "Soporte para 5,000 conexiones concurrentes", "Integración con 10 fuentes de datos externas"],
        category: "Web",
        techs: ["React", "TypeScript", "Python", "MongoDB"],
        gradient: "from-[#00D4AA] to-[#059669]",
        accent: "#00D4AA",
        stats: { stars: 94, views: "8.5k" },
        demo: "https://demo-analytics.example.com",
        repo: "https://github.com",
    },
    {
        id: 3,
        title: "API REST Microservices",
        description: "Arquitectura de microservicios escalable con autenticación JWT, rate limiting, caché Redis y documentación Swagger completa.",
        problem: "Monolito legado que escalaba pobremente y consumía recursos excesivos en picos de tráfico.",
        solution: "Desacoplamiento estratégico a microservicios en Node.js, aislando el componente de autenticación y compras.",
        achievements: ["Soporta 10k requests/segundo", "Uso de CPU reducido en 60%", "Despliegues sin tiempo de inactividad garantizados"],
        category: "Backend",
        techs: ["Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
        gradient: "from-[#F59E0B] to-[#D97706]",
        accent: "#F59E0B",
        stats: { stars: 215, views: "18k" },
        demo: "https://api-docs.example.com",
        repo: "https://github.com",
    },
    {
        id: 4,
        title: "Sistema de Gestión",
        description: "ERP empresarial con módulos de RRHH, finanzas, inventario y reportes automatizados. Reducción del 60% en tiempo operativo.",
        problem: "Fragmentación de información en Excel y procesos manuales que generaban cuellos de botella diarios.",
        solution: "Una suite integrada en Laravel con control de roles y permisos granulares (RBAC) y colas de tareas automáticas.",
        achievements: ["Automatización de planillas reduciendo 40h de trabajo", "Migración de 1M de registros históricos intactos", "Aprobación de la dirección general superada con 99% uptime"],
        category: "SaaS",
        techs: ["Laravel", "PHP", "React", "PostgreSQL"],
        gradient: "from-[#8B83FF] to-[#6C63FF]",
        accent: "#8B83FF",
        stats: { stars: 67, views: "5k" },
        demo: "https://erp-demo.example.com",
        repo: "https://github.com",
    },
    {
        id: 5,
        title: "Portfolio Builder",
        description: "Herramienta SaaS para crear portafolios profesionales sin código. Más de 30 templates premium, dominio personalizado y analytics.",
        problem: "Desarrolladores junior no tenían plataforma fácil para desplegar portafolios conectados a sus repositorios.",
        solution: "Construtor de sitios visual con Next.js + Tailwind, enlazado directamente a GitHub OAuth para sync instantáneo.",
        achievements: ["+2,000 portafolios creados", "TTFB (Time To First Byte) de 40ms global", "Puntaje Lighthouse de 100/100 en SEO y Performance"],
        category: "Web",
        techs: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
        gradient: "from-[#EC4899] to-[#BE185D]",
        accent: "#EC4899",
        stats: { stars: 183, views: "22k" },
        demo: "https://portfolio-builder.example.com",
        repo: "https://github.com",
    },
    {
        id: 6,
        title: "AI Chat Application",
        description: "Aplicación de chat con inteligencia artificial, soporte para múltiples modelos de lenguaje, historial persistente y personalización avanzada.",
        problem: "Inconsistencia de contexto en prompts largos y altos costos de tokens consumidos.",
        solution: "Sistema de memoria vectorial (RAG) nativo usando Vector DB para mantener contexto sin enviar prompts gigantescos.",
        achievements: ["Ahorro de $1,000/mes en API costs de OpenAI", "Respuestas más precisas en diálogos largos (mejora de +60%)", "Latencia promedio debajo de 1.5s"],
        category: "SaaS",
        techs: ["Next.js", "Python", "TypeScript", "MongoDB"],
        gradient: "from-[#14B8A6] to-[#0F766E]",
        accent: "#14B8A6",
        stats: { stars: 342, views: "31k" },
        demo: "https://ai-chat.example.com",
        repo: "https://github.com",
    },
];

export default function Projects() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedProject]);

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
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
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
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-2 rounded-lg border flex items-center gap-1 font-semibold transition-all duration-200 ${isLight
                                                        ? "bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] text-white border-transparent hover:shadow-[0_4px_16px_rgba(108,99,255,0.4)] hover:scale-105"
                                                        : "bg-gradient-to-r from-[#00D4AA] to-[#059669] text-[#0d1117] border-transparent hover:shadow-[0_4px_16px_rgba(0,212,170,0.4)] hover:scale-105"
                                                    }`}
                                            >
                                                <HiExternalLink size={16} /> <span className="text-xs">Demo</span>
                                            </a>
                                            <a
                                                href={project.repo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-2 rounded-lg border flex items-center gap-1 transition-all duration-200 ${isLight
                                                        ? "bg-white/60 border-slate-200 text-slate-500 hover:text-[#6C63FF] hover:border-[rgba(108,99,255,0.4)]"
                                                        : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.05)] text-gray-400 hover:text-white hover:border-[rgba(108,99,255,0.3)]"
                                                    }`}
                                            >
                                                <FaGithub size={15} /> <span className="text-xs">Código</span>
                                            </a>
                                        </div>
                                    </div>
                                    {/* Button to open project details modal */}
                                    <div className="mt-4 pt-4 border-t border-[rgba(108,99,255,0.1)]">
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors ${isLight ? "bg-[#EEF2FF] text-[#6C63FF] hover:bg-[#E0E7FF]" : "bg-[#1f2937] text-gray-300 hover:text-white hover:bg-[#374151]"
                                                }`}
                                        >
                                            Ver Detalles y Caso de Estudio
                                        </button>
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
                    </AnimatePresence>
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

            {/* Selected Project Modal for Case Study */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl relative ${isLight ? "bg-white border-[#EEF2FF]" : "bg-[#0d1117] border-[rgba(108,99,255,0.2)]"
                                }`}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-[110] ${isLight ? "bg-slate-100 text-slate-500 hover:text-slate-900" : "bg-[#1f2937] text-gray-400 hover:text-white"
                                    }`}
                            >
                                <HiX size={24} />
                            </button>

                            <div className="p-8 sm:p-10">
                                <h3 className={`text-3xl font-bold mb-2 ${isLight ? "text-slate-800" : "text-white"}`}>
                                    {selectedProject.title}
                                </h3>
                                <p className={`text-lg font-medium mb-8 ${isLight ? "text-[#6C63FF]" : "text-[#00D4AA]"}`}>
                                    Caso de Estudio
                                </p>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className={`text-xl font-semibold mb-3 ${isLight ? "text-slate-800" : "text-white"}`}>El Reto</h4>
                                        <p className={`leading-relaxed ${isLight ? "text-slate-600" : "text-gray-400"}`}>
                                            {selectedProject.problem}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className={`text-xl font-semibold mb-3 ${isLight ? "text-slate-800" : "text-white"}`}>La Solución</h4>
                                        <p className={`leading-relaxed ${isLight ? "text-slate-600" : "text-gray-400"}`}>
                                            {selectedProject.solution}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className={`text-xl font-semibold mb-4 ${isLight ? "text-slate-800" : "text-white"}`}>Métricas e Impacto</h4>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {selectedProject.achievements.map((achievement, idx) => (
                                                <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border ${isLight ? "bg-[#F8FAFC] border-slate-200" : "bg-[#111827] border-[rgba(255,255,255,0.05)]"
                                                    }`}>
                                                    <HiCheckCircle className={`text-xl shrink-0 mt-0.5 ${isLight ? "text-[#6C63FF]" : "text-[#00D4AA]"}`} />
                                                    <span className={`text-sm font-medium leading-relaxed ${isLight ? "text-slate-700" : "text-gray-300"}`}>
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-[rgba(108,99,255,0.1)] flex flex-wrap gap-4">
                                        <a
                                            href={selectedProject.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 ${isLight
                                                    ? "bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] text-white"
                                                    : "bg-gradient-to-r from-[#00D4AA] to-[#059669] text-[#0d1117]"
                                                }`}
                                        >
                                            <HiExternalLink size={20} /> Ver App en Vivo (Demo)
                                        </a>
                                        <a
                                            href={selectedProject.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border transition-colors ${isLight
                                                    ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                                                    : "border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                                                }`}
                                        >
                                            <FaGithub size={20} /> Ver Código Fuente
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
