import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Jhon Brayan Huincho Quispe | Full Stack Developer",
  description:
    "Portafolio profesional de Jhon Brayan Huincho Quispe — Desarrollador Full Stack especializado en React, Next.js y Laravel. Soluciones web modernas, rápidas y elegantes.",
  keywords: ["desarrollador", "portfolio", "full stack", "react", "nextjs", "laravel", "huancayo"],
  authors: [{ name: "Jhon Brayan Huincho Quispe" }],
  openGraph: {
    title: "Jhon Brayan Huincho Quispe | Full Stack Developer",
    description: "Creando experiencias digitales extraordinarias",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${jetbrains.variable} antialiased`}>
        <ThemeProvider>
          <div className="aurora-bg" />
          <div className="grid-bg" />
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
