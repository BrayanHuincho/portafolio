"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { HiMail, HiLocationMarker, HiPaperAirplane, HiExclamationCircle } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

const contactInfo = [
    { icon: HiMail, label: "Email", value: "jhon.huincho@email.com", href: "mailto:jhon.huincho@email.com", color: "#6C63FF" },
    { icon: FaWhatsapp, label: "WhatsApp", value: "+51 999 999 999", href: "https://wa.me/51999999999", color: "#25D366" },
    { icon: HiLocationMarker, label: "Ubicación", value: "Huancayo, Perú 🇵🇪", href: "#", color: "#00D4AA" },
];

const socials = [
    { icon: FaGithub, href: "https://github.com/jhonhuincho", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/jhonhuincho", label: "LinkedIn" },
];

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Fields>;

function validate(data: Fields): Errors {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Por favor, escribe tu nombre.";
    if (!data.email.trim()) e.email = "Por favor, escribe tu email.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Email inválido.";
    if (!data.subject.trim()) e.subject = "El asunto no puede estar vacío.";
    if (!data.message.trim()) e.message = "Escribe un mensaje antes de enviar.";
    return e;
}

export default function Contact() {
    const { theme } = useTheme();
    const isLight = theme === "light";
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    const [formData, setFormData] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [focused, setFocused] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        if (touched[name as keyof Fields]) {
            setErrors(validate(updated));
        }
    };

    const handleBlur = (name: keyof Fields) => {
        setTouched((p) => ({ ...p, [name]: true }));
        setErrors(validate(formData));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const allTouched = { name: true, email: true, subject: true, message: true };
        setTouched(allTouched);
        const errs = validate(formData);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        setStatus("sending");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Error enviando el formulario");
            }

            setStatus("sent");
        } catch (error) {
            console.error(error);
            setStatus("idle");
            alert("Hubo un error al enviar el mensaje. Inténtalo nuevamente por favor.");
        }
    };

    const inputBase = (field: keyof Fields) => {
        const hasError = touched[field] && errors[field];
        const isFocused = focused === field;
        const base = `w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 font-[var(--font-outfit)]`;
        const bg = isLight
            ? "bg-white border text-slate-800 placeholder-slate-400"
            : "bg-[rgba(17,24,39,0.6)] border text-white placeholder-gray-600";

        let border = "";
        if (hasError) border = "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.12)]";
        else if (isFocused) border = "border-[#6C63FF] shadow-[0_0_0_3px_rgba(108,99,255,0.1)]";
        else border = isLight ? "border-slate-200 hover:border-slate-300" : "border-[rgba(108,99,255,0.12)] hover:border-[rgba(108,99,255,0.3)]";

        return `${base} ${bg} ${border}`;
    };

    const textSec = isLight ? "text-slate-500" : "text-gray-400";
    const textPri = isLight ? "text-slate-800" : "text-white";

    return (
        <section id="contact" className="relative py-20 px-6 pb-28" ref={ref}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,212,170,0.01)] to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <span className={`inline-block px-4 py-1.5 rounded-full border text-sm font-medium mb-4 ${isLight
                        ? "bg-[rgba(0,212,170,0.07)] border-[rgba(0,212,170,0.2)] text-[#00B894]"
                        : "bg-[rgba(0,212,170,0.1)] border-[rgba(0,212,170,0.2)] text-[#00D4AA]"
                        }`}>
                        Contáctame
                    </span>
                    <h2 className={`text-4xl sm:text-5xl font-bold ${textPri}`}>
                        ¿Trabajamos{" "}
                        <span className="gradient-text">juntos?</span>
                    </h2>
                    <div className="flex justify-center mt-4">
                        <div className="section-divider" />
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-7">
                    {/* Left info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        {contactInfo.map((info) => (
                            <motion.a
                                key={info.label}
                                href={info.href}
                                target={info.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ x: 6 }}
                                transition={{ duration: 0.15 }}
                                className="glass-card p-4 flex items-center gap-4 group"
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${info.color}15`, border: `1px solid ${info.color}25` }}
                                >
                                    <info.icon size={20} style={{ color: info.color }} />
                                </div>
                                <div>
                                    <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${textSec}`}>{info.label}</p>
                                    <p className={`font-medium text-sm ${textPri}`}>{info.value}</p>
                                </div>
                            </motion.a>
                        ))}

                        {/* Socials */}
                        <div className="glass-card p-4">
                            <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${textSec}`}>Sígueme en</p>
                            <div className="flex gap-2">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-110 ${isLight
                                            ? "border-slate-200 text-slate-500 hover:text-[#6C63FF] hover:border-[rgba(108,99,255,0.35)]"
                                            : "border-[rgba(255,255,255,0.06)] text-gray-500 hover:text-white hover:border-[rgba(108,99,255,0.3)]"
                                            }`}
                                    >
                                        <s.icon size={17} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="glass-card p-4 flex items-center gap-3">
                            <div className="relative flex h-3 w-3 flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4AA] opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D4AA]" />
                            </div>
                            <div>
                                <p className={`font-semibold text-sm ${textPri}`}>Disponible ahora</p>
                                <p className={`text-xs ${textSec}`}>Respondo en menos de 24h</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="lg:col-span-3"
                    >
                        <div className="glass-card p-7">
                            {status === "sent" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-14 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4AA] to-[#059669] flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(0,212,170,0.35)]">
                                        <HiPaperAirplane className="text-white rotate-45" size={28} />
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-2 ${textPri}`}>¡Mensaje enviado!</h3>
                                    <p className={`mb-7 text-sm ${textSec}`}>Te responderé en menos de 24 horas 🚀</p>
                                    <button
                                        onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", subject: "", message: "" }); setErrors({}); setTouched({}); }}
                                        className="px-6 py-2.5 rounded-xl bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.25)] text-[#8B83FF] hover:bg-[rgba(108,99,255,0.18)] transition-colors text-sm font-medium"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div>
                                            <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${textSec}`}>Nombre *</label>
                                            <input
                                                id="c-name" type="text" name="name" placeholder="Tu nombre"
                                                value={formData.name} onChange={handleChange}
                                                onFocus={() => setFocused("name")}
                                                onBlur={() => { setFocused(null); handleBlur("name"); }}
                                                className={inputBase("name")}
                                            />
                                            {touched.name && errors.name && (
                                                <p className="mt-1.5 flex items-center gap-1 text-red-400 text-xs font-medium">
                                                    <HiExclamationCircle size={13} /> {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${textSec}`}>Email *</label>
                                            <input
                                                id="c-email" type="email" name="email" placeholder="tu@email.com"
                                                value={formData.email} onChange={handleChange}
                                                onFocus={() => setFocused("email")}
                                                onBlur={() => { setFocused(null); handleBlur("email"); }}
                                                className={inputBase("email")}
                                            />
                                            {touched.email && errors.email && (
                                                <p className="mt-1.5 flex items-center gap-1 text-red-400 text-xs font-medium">
                                                    <HiExclamationCircle size={13} /> {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${textSec}`}>Asunto *</label>
                                        <input
                                            id="c-subject" type="text" name="subject" placeholder="¿En qué puedo ayudarte?"
                                            value={formData.subject} onChange={handleChange}
                                            onFocus={() => setFocused("subject")}
                                            onBlur={() => { setFocused(null); handleBlur("subject"); }}
                                            className={inputBase("subject")}
                                        />
                                        {touched.subject && errors.subject && (
                                            <p className="mt-1.5 flex items-center gap-1 text-red-400 text-xs font-medium">
                                                <HiExclamationCircle size={13} /> {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${textSec}`}>Mensaje *</label>
                                        <textarea
                                            id="c-message" name="message" placeholder="Cuéntame sobre tu proyecto..." rows={5}
                                            value={formData.message} onChange={handleChange}
                                            onFocus={() => setFocused("message")}
                                            onBlur={() => { setFocused(null); handleBlur("message"); }}
                                            className={`${inputBase("message")} resize-none`}
                                        />
                                        {touched.message && errors.message && (
                                            <p className="mt-1.5 flex items-center gap-1 text-red-400 text-xs font-medium">
                                                <HiExclamationCircle size={13} /> {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        disabled={status === "sending"}
                                        whileHover={{ scale: 1.015, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] shadow-[0_4px_20px_rgba(108,99,255,0.3)] hover:shadow-[0_8px_30px_rgba(108,99,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 text-sm"
                                    >
                                        {status === "sending" ? (
                                            <>
                                                <motion.div
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                                                />
                                                Enviando…
                                            </>
                                        ) : (
                                            <>
                                                <HiPaperAirplane className="rotate-45" size={16} />
                                                Enviar Mensaje
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
