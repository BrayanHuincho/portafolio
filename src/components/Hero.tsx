"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiArrowRight, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
    const { theme } = useTheme();
    const isLight = theme === "light";

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden pt-20"
        >
            {/* Gradient orbs (Optimized blur to avoid lag) */}
            <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#6C63FF] rounded-full opacity-[0.05] blur-3xl animate-[float_10s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/4 right-10 w-[250px] h-[250px] bg-[#00D4AA] rounded-full opacity-[0.04] blur-3xl animate-[float-delayed_12s_ease-in-out_infinite]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-16 lg:pt-28 pb-16">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

                    {/* ── LEFT: Text content ── */}
                    <div className="flex flex-col gap-5 order-2 lg:order-1">

                        {/* Greeting */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className={`text-base font-medium tracking-wide ${isLight ? "text-slate-600" : "text-gray-400"}`}
                        >
                            👋 Hola, soy
                        </motion.p>

                        {/* Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                <span className="gradient-text-name">Jhon Brayan</span>
                                <br />
                                <span className={isLight ? "text-slate-800" : "text-white"}>
                                    Huincho Quispe
                                </span>
                            </h1>
                        </motion.div>

                        {/* Typing */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl"
                        >
                            <span className="text-[#6C63FF] font-mono font-bold flex-shrink-0">{">"}</span>
                            <TypeAnimation
                                sequence={[
                                    "Desarrollador Web Full Stack",
                                    2000,
                                    "Experto en React & Next.js",
                                    2000,
                                    "Desarrollador de APIs REST",
                                    2000,
                                    "Creador de UI/UX modernas",
                                    2000,
                                    "Desarrollador Laravel & PHP",
                                    2000,
                                ]}
                                wrapper="span"
                                speed={55}
                                deletionSpeed={70}
                                repeat={Infinity}
                                className={`font-semibold ${isLight ? "text-slate-800" : "text-white"}`}
                            />
                            <span className="w-[2px] h-6 bg-[#00D4AA] animate-pulse flex-shrink-0" />
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className={`text-sm sm:text-base leading-relaxed max-w-lg ${isLight ? "text-slate-600" : "text-gray-400"}`}
                        >
                            Convierto tus ideas en{" "}
                            <span className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                                aplicaciones reales que impresionan
                            </span>
                            . Código limpio, diseño moderno y resultados que hablan por sí solos.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap gap-3"
                        >
                            <a
                                href="#projects"
                                className="magnetic-btn group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] text-white font-semibold rounded-2xl text-sm hover:shadow-[0_8px_30px_rgba(108,99,255,0.4)]"
                            >
                                Ver Proyectos
                                <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                            <a
                                href="/cv-jhon-huincho.docx"
                                download
                                className={`magnetic-btn group flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold border transition-all duration-300 ${isLight
                                    ? "bg-white/70 backdrop-blur border-[rgba(108,99,255,0.3)] text-slate-700 hover:border-[rgba(108,99,255,0.6)] hover:shadow-lg"
                                    : "bg-transparent border-[rgba(108,99,255,0.3)] text-white hover:border-[rgba(108,99,255,0.6)]"
                                    }`}
                            >
                                <HiDownload className="group-hover:animate-bounce" />
                                Descargar CV
                            </a>
                        </motion.div>

                        {/* Social Icon Buttons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex items-center gap-3"
                        >
                            {[
                                {
                                    icon: FaGithub,
                                    href: "https://github.com/jhonhuincho",
                                    label: "GitHub",
                                    hoverColor: "#ffffff",
                                },
                                {
                                    icon: FaLinkedin,
                                    href: "https://linkedin.com/in/jhonhuincho",
                                    label: "LinkedIn",
                                    hoverColor: "#0A66C2",
                                },
                            ].map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    whileHover={{ scale: 1.12, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className={`relative w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 group ${isLight
                                        ? "bg-white/70 backdrop-blur border-[rgba(108,99,255,0.2)] text-slate-600 hover:border-[rgba(108,99,255,0.5)] hover:text-[#6C63FF] hover:shadow-[0_4px_16px_rgba(108,99,255,0.2)]"
                                        : "bg-[rgba(255,255,255,0.05)] border-[rgba(108,99,255,0.15)] text-gray-400 hover:text-white hover:border-[rgba(108,99,255,0.4)] hover:bg-[rgba(108,99,255,0.1)] hover:shadow-[0_4px_16px_rgba(108,99,255,0.2)]"
                                        }`}
                                >
                                    <s.icon size={20} />
                                    {/* Tooltip */}
                                    <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${isLight ? "bg-slate-800 text-white" : "bg-white/10 text-white backdrop-blur"
                                        }`}>
                                        {s.label}
                                    </span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Avatar Card ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="flex justify-center items-center order-1 lg:order-2 w-full max-w-[280px] sm:max-w-xs lg:max-w-none mx-auto"
                    >
                        <div className="relative w-full aspect-square lg:w-80 lg:h-80">
                            {/* Inner glow optimized */}
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4AA] opacity-[0.08] blur-2xl pointer-events-none" />

                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#6C63FF] via-[#8B83FF] to-[#00D4AA] p-[2px]">
                                <div className={`w-full h-full rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden ${isLight ? "bg-white/90 backdrop-blur-sm" : "bg-[#0d1117] shadow-xl"
                                    }`}>
                                    {/* Formal Photo */}
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500"
                                        alt="Jhon Brayan Huincho Quispe"
                                        className="absolute inset-0 w-full h-full object-cover object-top opacity-90 transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Gradient overlay to make text pop if needed (kept very light visually) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-4 left-0 right-0 z-10 text-center px-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,212,170,0.15)] border border-[rgba(0,212,170,0.4)] backdrop-blur-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
                                            <span className="text-white drop-shadow-md shadow-black text-xs font-semibold">Open to work</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating tech badges - optimized for less lag */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-3 -right-3 sm:-right-5 bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(108,99,255,0.3)] z-10"
                            >
                                Next.js 15
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                                className="absolute -bottom-3 -left-3 sm:-left-5 bg-gradient-to-br from-[#00D4AA] to-[#059669] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(0,212,170,0.3)] z-10"
                            >
                                Laravel & PHP
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                                className={`absolute top-1/2 -left-4 sm:-left-7 -translate-y-1/2 border text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg z-10 ${isLight
                                    ? "bg-white border-[rgba(108,99,255,0.3)] text-slate-700"
                                    : "bg-[rgba(17,24,39,0.9)] border-[rgba(108,99,255,0.3)] text-gray-200"
                                    }`}
                            >
                                TypeScript
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
