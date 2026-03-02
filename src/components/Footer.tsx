"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 px-6 border-t border-[rgba(108,99,255,0.08)]">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00D4AA] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">&lt;/&gt;</span>
                        </div>
                        <span className="text-white font-semibold">Portfolio</span>
                    </motion.a>

                    {/* Copyright */}
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                        © {currentYear} — Hecho con{" "}
                        <HiHeart className="text-[#6C63FF] animate-pulse" size={14} />
                        {" "}en Lima, Perú
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-3">
                        {[
                            { icon: FaGithub, href: "https://github.com", label: "GitHub" },
                            { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                            { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                        ].map((s) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                whileHover={{ scale: 1.15, y: -3 }}
                                className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-gray-500 hover:text-white hover:border-[rgba(108,99,255,0.3)] transition-all duration-300"
                            >
                                <s.icon size={16} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
