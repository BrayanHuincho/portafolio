"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiArrowRight, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import FloatingParticles from "./FloatingParticles";

export default function Hero() {
    const { theme } = useTheme();
    const isLight = theme === "light";

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            <FloatingParticles />

            {/* Gradient orbs */}
            <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#6C63FF] rounded-full opacity-[0.06] blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-[#00D4AA] rounded-full opacity-[0.05] blur-[100px] animate-[float-delayed_10s_ease-in-out_infinite]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* ── LEFT: Text content ── */}
                    <div className="flex flex-col gap-5">

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
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="hidden lg:flex justify-end items-center"
                    >
                        <div className="relative">
                            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4AA] opacity-[0.12] blur-3xl" />

                            <div className="relative w-80 h-80">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6C63FF] via-[#8B83FF] to-[#00D4AA] p-[2px]">
                                    <div className={`w-full h-full rounded-3xl flex flex-col items-center justify-center gap-4 relative overflow-hidden ${isLight ? "bg-white/80 backdrop-blur-sm" : "bg-[#0d1117]"
                                        }`}>
                                        {/* dot pattern */}
                                        <div
                                            className="absolute inset-0 opacity-[0.05]"
                                            style={{
                                                backgroundImage: "radial-gradient(circle, #6C63FF 1px, transparent 1px)",
                                                backgroundSize: "22px 22px",
                                            }}
                                        />
                                        {/* Initials */}
                                        <motion.div
                                            animate={{ scale: [1, 1.04, 1] }}
                                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                            className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00D4AA] flex items-center justify-center shadow-[0_0_32px_rgba(108,99,255,0.45)]"
                                        >
                                            <span className="text-white text-4xl font-black">JH</span>
                                        </motion.div>
                                        <div className="relative z-10 text-center">
                                            <p className={`font-bold text-lg leading-tight ${isLight ? "text-slate-800" : "text-white"}`}>Jhon Brayan</p>
                                            <p className={`font-bold text-lg leading-tight ${isLight ? "text-slate-800" : "text-white"}`}>Huincho Quispe</p>
                                            <p className="text-[#00D4AA] text-sm mt-1 font-semibold">Full Stack Developer</p>
                                        </div>
                                        <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.35)]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
                                            <span className="text-[#00D4AA] text-xs font-semibold">Open to work</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating tech badges */}
                                <motion.div
                                    animate={{ y: [0, -9, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-5 bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg"
                                >
                                    Next.js 15
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 9, 0] }}
                                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute -bottom-4 -left-5 bg-gradient-to-br from-[#00D4AA] to-[#059669] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg"
                                >
                                    Laravel & PHP
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                                    className={`absolute top-1/2 -left-7 -translate-y-1/2 border text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg ${isLight
                                            ? "bg-white border-[rgba(108,99,255,0.3)] text-slate-700"
                                            : "bg-[rgba(17,24,39,0.9)] border-[rgba(108,99,255,0.3)] text-gray-200"
                                        }`}
                                >
                                    TypeScript
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
