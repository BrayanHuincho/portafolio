"use client";

import { motion, Easing } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    HiAcademicCap, HiCode, HiLightningBolt, HiSparkles, HiCube, HiLocationMarker,
} from "react-icons/hi";
import { useTheme } from "./ThemeProvider";

const easeOut: Easing = "easeOut";

const services = [
    { icon: HiCode, title: "Desarrollo Web", gradient: "from-[#6C63FF] to-[#4F46E5]" },
    { icon: HiCube, title: "APIs & Backend", gradient: "from-[#00D4AA] to-[#059669]" },
    { icon: HiSparkles, title: "UI/UX Design", gradient: "from-[#8B83FF] to-[#6C63FF]" },
    { icon: HiLightningBolt, title: "Optimización", gradient: "from-[#F59E0B] to-[#D97706]" },
];

const stats = [
    { number: "10+", label: "Proyectos" },
    { number: "5+", label: "Tecnologías" },
    { number: "2026", label: "Egresado" },
];

export default function About() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 22 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
        transition: { duration: 0.5, delay, ease: easeOut },
    });

    const textSec = isLight ? "text-slate-500" : "text-gray-400";
    const textPri = isLight ? "text-slate-800" : "text-white";

    return (
        <section id="about" className="relative py-20 px-6" ref={ref}>
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="text-center mb-14"
                >
                    <span className={`inline-block px-4 py-1.5 rounded-full border text-sm font-medium mb-4 ${isLight
                            ? "bg-[rgba(108,99,255,0.07)] border-[rgba(108,99,255,0.2)] text-[#6C63FF]"
                            : "bg-[rgba(108,99,255,0.1)] border-[rgba(108,99,255,0.2)] text-[#8B83FF]"
                        }`}>
                        Sobre Mí
                    </span>
                    <h2 className={`text-4xl sm:text-5xl font-bold ${textPri}`}>
                        Quién soy &{" "}
                        <span className="gradient-text">qué hago</span>
                    </h2>
                </motion.div>

                {/* Content grid */}
                <div className="grid md:grid-cols-2 gap-5">

                    {/* Bio card */}
                    <motion.div
                        {...fadeUp(0.1)}
                        className="glass-card p-6 md:col-span-2"
                    >
                        <p className={`leading-relaxed text-base ${textSec}`}>
                            Soy{" "}
                            <span className="gradient-text-name font-bold text-lg">
                                Jhon Brayan Huincho Quispe
                            </span>
                            , desarrollador de software con experiencia real construyendo proyectos para empresas.
                            Me especializo en crear aplicaciones web rápidas, escalables y con un diseño que impresiona —
                            desde el primer vistazo.
                        </p>
                    </motion.div>

                    {/* Education card */}
                    <motion.div {...fadeUp(0.2)} className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] flex items-center justify-center flex-shrink-0">
                                <HiAcademicCap className="text-white" size={20} />
                            </div>
                            <h3 className={`font-semibold ${textPri}`}>Educación</h3>
                        </div>
                        <p className={`font-semibold text-sm ${textPri}`}>
                            Instituto Continental
                        </p>
                        <p className="text-[#00D4AA] text-xs font-semibold mt-0.5">
                            Desarrollo de Sistemas de Información
                        </p>
                        <div className={`flex items-center gap-1.5 mt-2 text-xs ${textSec}`}>
                            <HiLocationMarker size={12} className="flex-shrink-0" />
                            <span>Huancayo, Perú · Egresado 2026</span>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div {...fadeUp(0.25)} className="glass-card p-6 flex items-center justify-around">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl font-black gradient-text">{stat.number}</p>
                                <p className={`text-xs mt-0.5 font-medium ${textSec}`}>{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Services */}
                    <motion.div {...fadeUp(0.3)} className="md:col-span-2">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {services.map((s) => (
                                <motion.div
                                    key={s.title}
                                    whileHover={{ scale: 1.04, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="glass-card p-4 flex items-center gap-3 group cursor-default"
                                >
                                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center flex-shrink-0`}>
                                        <s.icon className="text-white" size={17} />
                                    </div>
                                    <span className={`text-sm font-medium group-hover:text-[#6C63FF] transition-colors ${textSec}`}>
                                        {s.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
