"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";

const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Experiencia", href: "#experience" },
    { name: "Tecnologías", href: "#tech" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState("hero");
    const { theme, toggle } = useTheme();

    const detectSection = useCallback(() => {
        const sections = [...navLinks].map((l) => l.href.replace("#", ""));
        // Iterate in reverse to find the last section that has scrolled past 150px
        let found = "hero";
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top;
                if (top <= 160) found = id;
            }
        }
        setActive(found);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            detectSection();
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        detectSection(); // run once on mount
        return () => window.removeEventListener("scroll", onScroll);
    }, [detectSection]);

    const isLight = theme === "light";

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-400 ${scrolled ? "w-[90%] max-w-3xl" : "w-[95%] max-w-4xl"
                    }`}
            >
                <div
                    className={`flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-400 ${scrolled
                        ? isLight
                            ? "bg-[rgba(248,250,255,0.9)] backdrop-blur-xl border-[rgba(108,99,255,0.2)] shadow-[0_8px_32px_rgba(108,99,255,0.08)]"
                            : "bg-[rgba(3,7,18,0.88)] backdrop-blur-xl border-[rgba(108,99,255,0.18)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : isLight
                            ? "bg-[rgba(248,250,255,0.6)] backdrop-blur-md border-[rgba(108,99,255,0.1)]"
                            : "bg-[rgba(3,7,18,0.5)] backdrop-blur-md border-[rgba(108,99,255,0.08)]"
                        }`}
                >
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2 group flex-shrink-0">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00D4AA] flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(108,99,255,0.5)] transition-shadow duration-300">
                            <span className="text-white font-bold text-sm">&lt;/&gt;</span>
                        </div>
                        <span className={`font-semibold text-sm hidden sm:block ${isLight ? "text-slate-800" : "text-white"}`}>
                            JH.dev
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const id = link.href.replace("#", "");
                            const isActive = active === id;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${isActive
                                        ? isLight ? "text-slate-900" : "text-white"
                                        : isLight
                                            ? "text-slate-500 hover:text-slate-900"
                                            : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className={`absolute inset-0 rounded-xl ${isLight
                                                ? "bg-[rgba(108,99,255,0.12)] border border-[rgba(108,99,255,0.25)]"
                                                : "bg-[rgba(108,99,255,0.15)] border border-[rgba(108,99,255,0.2)]"
                                                }`}
                                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right side: theme toggle + CTA */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle temporarily hidden */}
                        <motion.button
                            onClick={toggle}
                            aria-label="Cambiar tema"
                            className="hidden"
                        >
                            <HiSun size={18} />
                        </motion.button>

                        {/* CTA */}
                        <a
                            href="#contact"
                            className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] rounded-xl hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all duration-300 hover:scale-105"
                        >
                            Contáctame
                        </a>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`md:hidden p-2 rounded-lg transition-colors ${isLight
                                ? "text-slate-700 hover:bg-[rgba(108,99,255,0.08)]"
                                : "text-white hover:bg-[rgba(108,99,255,0.1)]"
                                }`}
                        >
                            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.18 }}
                            className={`mt-2 p-4 rounded-2xl border shadow-xl ${isLight
                                ? "bg-[rgba(248,250,255,0.95)] backdrop-blur-xl border-[rgba(108,99,255,0.15)]"
                                : "bg-[rgba(3,7,18,0.95)] backdrop-blur-xl border-[rgba(108,99,255,0.18)]"
                                }`}
                        >
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active === link.href.replace("#", "")
                                            ? isLight
                                                ? "text-slate-900 bg-[rgba(108,99,255,0.1)]"
                                                : "text-white bg-[rgba(108,99,255,0.15)]"
                                            : isLight
                                                ? "text-slate-500 hover:text-slate-900 hover:bg-[rgba(108,99,255,0.07)]"
                                                : "text-gray-400 hover:text-white hover:bg-[rgba(108,99,255,0.08)]"
                                            }`}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <a
                                    href="#contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="mt-2 px-4 py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] rounded-xl"
                                >
                                    Contáctame
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
