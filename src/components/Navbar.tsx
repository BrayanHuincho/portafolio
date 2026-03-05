"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
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
    const { theme } = useTheme();

    const detectSection = useCallback(() => {
        const sections = [...navLinks].map((l) => l.href.replace("#", ""));
        let found = "hero";
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top;
                if (top <= 120) found = id;
            }
        }
        setActive(found);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            detectSection();
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        detectSection();
        return () => window.removeEventListener("scroll", onScroll);
    }, [detectSection]);

    const isLight = theme === "light";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300 ${scrolled ? "pointer-events-auto" : "pointer-events-none"
                }`}
        >
            <nav
                className={`relative flex items-center justify-center px-2 py-2 rounded-full border transition-all duration-500 pointer-events-auto ${scrolled
                        ? isLight
                            ? "bg-white/60 backdrop-blur-xl border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                            : "bg-[#0b1120]/60 backdrop-blur-xl border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                        : "bg-transparent border-transparent"
                    }`}
            >
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1 sm:gap-2">
                    {navLinks.map((link) => {
                        const id = link.href.replace("#", "");
                        const isActive = active === id;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`relative px-5 py-2.5 text-[15px] font-medium rounded-full transition-all duration-300 ${isActive
                                        ? isLight ? "text-slate-900 font-semibold" : "text-white font-semibold"
                                        : isLight
                                            ? "text-slate-500 hover:text-slate-900"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="navIndicator"
                                        className={`absolute inset-0 rounded-full -z-10 ${isLight
                                                ? "bg-white shadow-sm border border-slate-100"
                                                : "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5"
                                            }`}
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center px-4">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`p-2 rounded-full transition-colors ${isLight
                                ? "text-slate-700 hover:bg-slate-100 bg-white shadow-sm"
                                : "text-slate-300 hover:bg-[#1f2937]/60 bg-white/5"
                            }`}
                    >
                        {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-4 p-4 rounded-3xl border shadow-2xl flex flex-col gap-1 pointer-events-auto md:hidden overflow-hidden ${isLight
                                ? "bg-white/95 backdrop-blur-2xl border-slate-200/50"
                                : "bg-[#0b1120]/95 backdrop-blur-2xl border-white/10"
                            }`}
                        style={{ width: "calc(100% - 2rem)", maxWidth: "400px" }}
                    >
                        {navLinks.map((link) => {
                            const id = link.href.replace("#", "");
                            const isActive = active === id;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`px-5 py-4 rounded-2xl text-[15px] font-medium transition-all duration-300 ${isActive
                                            ? isLight
                                                ? "text-slate-900 bg-slate-100/80"
                                                : "text-white bg-white/10"
                                            : isLight
                                                ? "text-slate-600 hover:bg-slate-50"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
