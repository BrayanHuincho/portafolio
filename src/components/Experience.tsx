"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "./ThemeProvider";
import { HiBriefcase, HiAcademicCap, HiCalendar } from "react-icons/hi";

const experienceData = [
    {
        id: 1,
        type: "work",
        title: "Desarrollador Full Stack Senior",
        organization: "Empresa Tecnológica (Ejemplo)",
        period: "2024 - Presente",
        location: "Remoto / Perú",
        description: "Liderando el desarrollo de sistemas escalables. He optimizado consultas en base de datos logrando una mejora del 40% en velocidad de carga.",
        achievements: [
            "Reducción del 40% en el tiempo de procesamiento de reportes usando colas y caché.",
            "Liderazgo técnico en la migración de arquitectura monolítica a microservicios (Node.js/React).",
            "Mantenimiento de disponibilidad del 99.9% en servidores de producción en AWS."
        ]
    },
    {
        id: 2,
        type: "work",
        title: "Desarrollador Frontend & Backend",
        organization: "Agencia Digital",
        period: "2023 - 2024",
        location: "Huancayo, Perú",
        description: "Construcción de aplicaciones web interactivas y APIs REST para más de 10 clientes internacionales.",
        achievements: [
            "Desarrollé un sistema de ventas Laravel que maneja +1,000 transacciones diarias sin caída.",
            "Implementación de interfaces pixel-perfect en React con Next.js.",
            "Integración de pasarelas de pago y facturación electrónica."
        ]
    },
    {
        id: 3,
        type: "education",
        title: "Desarrollo de Sistemas de Información",
        organization: "Instituto Continental",
        period: "Egresado 2026",
        location: "Huancayo, Perú",
        description: "Formación integral en ingeniería de software, arquitectura de sistemas y gestión de bases de datos. Desarrollé capacidades de liderazgo y trabajo en equipo bajo metodologías ágiles.",
        achievements: []
    }
];

export default function Experience() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(139,131,255,0.1)] border border-[rgba(139,131,255,0.2)] text-[#8B83FF] text-sm font-medium mb-4">
                        Trayectoria
                    </span>
                    <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isLight ? "text-slate-800" : "text-white"}`}>
                        Experiencia <span className="gradient-text">Profesional</span>
                    </h2>
                    <div className="flex justify-center mb-4">
                        <div className="section-divider" />
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Line in the middle (desktop) / left (mobile) */}
                    <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 ${isLight ? "bg-gradient-to-b from-[#6C63FF]/30 to-transparent" : "bg-gradient-to-b from-[#6C63FF]/20 to-transparent"
                        }`} />

                    <div className="space-y-12">
                        {experienceData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Icon in center */}
                                    <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-lg ${isLight
                                                ? "bg-white border-[#EEF2FF] shadow-[rgba(108,99,255,0.2)]"
                                                : "bg-[#0B1121] border-[#030712] shadow-[#6C63FF]/20"
                                            }`}>
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4AA] flex items-center justify-center">
                                                {item.type === "work" ? <HiBriefcase className="text-white text-lg" /> : <HiAcademicCap className="text-white text-lg" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-16 md:ml-0 md:w-5/12 ${isEven ? "md:text-left" : "md:text-right"}`}>
                                        <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${isLight
                                                ? "bg-white/60 backdrop-blur-md border-[rgba(108,99,255,0.15)] shadow-xl hover:shadow-[0_8px_30px_rgba(108,99,255,0.15)] hover:border-[rgba(108,99,255,0.3)]"
                                                : "bg-[rgba(17,24,39,0.6)] backdrop-blur-md border-[rgba(108,99,255,0.1)] hover:border-[rgba(108,99,255,0.3)] hover:shadow-[0_8px_30px_rgba(108,99,255,0.1)]"
                                            }`}>

                                            <div className={`flex items-center gap-2 mb-3 ${isEven ? "" : "md:justify-end"}`}>
                                                <HiCalendar className="text-[#6C63FF]" />
                                                <span className={`text-sm font-semibold tracking-wide ${isLight ? "text-[#6C63FF]" : "text-[#8B83FF]"}`}>
                                                    {item.period}
                                                </span>
                                            </div>

                                            <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${isLight ? "text-slate-800" : "text-white"}`}>
                                                {item.title}
                                            </h3>

                                            <p className={`text-sm sm:text-base font-medium mb-4 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                                                {item.organization} · {item.location}
                                            </p>

                                            <p className={`text-sm leading-relaxed mb-4 ${isLight ? "text-slate-600" : "text-gray-400"}`}>
                                                {item.description}
                                            </p>

                                            {item.achievements.length > 0 && (
                                                <ul className="space-y-2 mt-4">
                                                    {item.achievements.map((achieve, i) => (
                                                        <li key={i} className={`flex text-sm items-start gap-2 ${isEven ? "text-left" : "md:flex-row-reverse md:text-right text-left"}`}>
                                                            <span className="text-[#00D4AA] mt-1 shrink-0">▸</span>
                                                            <span className={isLight ? "text-slate-600" : "text-gray-300"}>{achieve}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

