const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    ShadingType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    VerticalAlign,
    convertInchesToTwip,
    UnderlineType,
} = require("docx");

const fs = require("fs");
const path = require("path");

// ─── Color palette ───────────────────────────────────────────────────────────
const PRIMARY = "4F46E5"; // indigo-600
const PRIMARY_L = "EEF2FF"; // indigo-50
const ACCENT = "00B894"; // teal
const DARK = "1E293B"; // slate-800
const GRAY = "64748B"; // slate-500
const LIGHT = "F8FAFC"; // slate-50
const WHITE = "FFFFFF";
const SECTION_BG = "F1F5F9"; // slate-100

// ─── Helpers ──────────────────────────────────────────────────────────────────
const pt = (n) => n * 2; // half-points (docx unit)
const cm = (n) => convertInchesToTwip(n / 2.54);

function header1(text) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: pt(4) },
        children: [
            new TextRun({
                text,
                bold: true,
                size: pt(28),
                color: WHITE,
                font: "Calibri",
            }),
        ],
        shading: { type: ShadingType.SOLID, color: PRIMARY, fill: PRIMARY },
        border: { bottom: { style: BorderStyle.NONE } },
    });
}

function header2(text) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: pt(2) },
        children: [
            new TextRun({
                text,
                size: pt(12),
                color: PRIMARY_L,
                font: "Calibri",
                characterSpacing: 80,
            }),
        ],
        shading: { type: ShadingType.SOLID, color: PRIMARY, fill: PRIMARY },
    });
}

function contactLine(text) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: pt(6) },
        children: [
            new TextRun({
                text,
                size: pt(10),
                color: PRIMARY_L,
                font: "Calibri",
            }),
        ],
        shading: { type: ShadingType.SOLID, color: PRIMARY, fill: PRIMARY },
    });
}

function spacer(after = 6) {
    return new Paragraph({ spacing: { after: pt(after) }, children: [new TextRun("")] });
}

function sectionTitle(text) {
    return new Paragraph({
        spacing: { before: pt(12), after: pt(4) },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY } },
        children: [
            new TextRun({
                text: text.toUpperCase(),
                bold: true,
                size: pt(13),
                color: PRIMARY,
                font: "Calibri",
                characterSpacing: 120,
            }),
        ],
    });
}

function itemTitle(left, right) {
    return new Paragraph({
        spacing: { before: pt(5), after: pt(1) },
        children: [
            new TextRun({ text: left, bold: true, size: pt(11), color: DARK, font: "Calibri" }),
            new TextRun({ text: `   ${right}`, size: pt(10), color: GRAY, font: "Calibri", italics: true }),
        ],
    });
}

function itemSubtitle(text) {
    return new Paragraph({
        spacing: { after: pt(2) },
        children: [
            new TextRun({ text, size: pt(10), color: ACCENT, font: "Calibri", bold: true }),
        ],
    });
}

function bullet(text) {
    return new Paragraph({
        spacing: { after: pt(2) },
        indent: { left: cm(0.5), hanging: cm(0.3) },
        children: [
            new TextRun({ text: "▪  ", color: PRIMARY, size: pt(10), font: "Calibri", bold: true }),
            new TextRun({ text, size: pt(10), color: DARK, font: "Calibri" }),
        ],
    });
}

function bodyText(text) {
    return new Paragraph({
        spacing: { after: pt(3) },
        children: [new TextRun({ text, size: pt(10), color: DARK, font: "Calibri" })],
    });
}

// Skills pill table (2 columns)
function skillsTable(skills) {
    const half = Math.ceil(skills.length / 2);
    const col1 = skills.slice(0, half);
    const col2 = skills.slice(half);
    const rows = Array.from({ length: half }, (_, i) => {
        const cells = [col1[i], col2[i] || ""].map((s) =>
            new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: cm(0.05), bottom: cm(0.05), left: cm(0.2), right: cm(0.2) },
                borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                },
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: s ? `● ${s}` : "",
                                size: pt(10),
                                color: s ? DARK : WHITE,
                                font: "Calibri",
                            }),
                        ],
                    }),
                ],
            })
        );
        return new TableRow({ children: cells });
    });

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows,
        borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideH: { style: BorderStyle.NONE },
            insideV: { style: BorderStyle.NONE },
        },
    });
}

// ─── Document ─────────────────────────────────────────────────────────────────
async function buildCV() {
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { font: "Calibri", size: pt(10), color: DARK },
                    paragraph: { spacing: { line: 276 } },
                },
            },
        },
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: cm(1.2),
                            right: cm(1.8),
                            bottom: cm(1.2),
                            left: cm(1.8),
                        },
                    },
                },
                children: [
                    // ── HEADER ──────────────────────────────────────────────────────────
                    header1("JHON BRAYAN HUINCHO QUISPE"),
                    header2("DESARROLLADOR DE SOFTWARE · FULL STACK"),
                    contactLine(
                        "📧 jhon.huincho@email.com   |   📱 +51 999 999 999   |   🌐 github.com/jhonhuincho"
                    ),
                    contactLine("📍 Huancayo, Junín, Perú   |   🔗 linkedin.com/in/jhonhuincho"),
                    spacer(8),

                    // ── PERFIL PROFESIONAL ──────────────────────────────────────────────
                    sectionTitle("Perfil Profesional"),
                    bodyText(
                        "Desarrollador de Software egresado del Instituto Continental, especializado en Desarrollo de " +
                        "Sistemas de Información. Apasionado por crear aplicaciones web modernas, escalables y visualmente " +
                        "atractivas con React, Next.js, Laravel y Node.js. He ejecutado proyectos reales para empresas, " +
                        "entregando soluciones de calidad con buenas prácticas de código limpio y arquitectura sólida."
                    ),
                    spacer(4),

                    // ── EDUCACIÓN ───────────────────────────────────────────────────────
                    sectionTitle("Educación"),
                    itemTitle(
                        "Instituto de Educación Superior Tecnológico Privado Continental",
                        "2022 – 2025"
                    ),
                    itemSubtitle("Desarrollo de Sistemas de Información · Egresado"),
                    bullet("Huancayo, Junín, Perú"),
                    bullet("Formación en programación web, base de datos, redes y gestión de proyectos TI"),
                    bullet("Proyectos académicos aplicados a sistemas empresariales reales"),
                    spacer(4),

                    // ── EXPERIENCIA / PROYECTOS ─────────────────────────────────────────
                    sectionTitle("Proyectos para Empresas"),

                    itemTitle("Sistema de Gestión Farmacéutica", "2024"),
                    itemSubtitle("Laravel · PHP · MySQL · React · TailwindCSS"),
                    bullet("ERP modular con gestión de inventario, ventas y caja para farmacia."),
                    bullet("Módulo de reportes y analítica de ventas con gráficas en tiempo real."),
                    bullet("Multiusuario con roles: Administrador y Farmacéutico."),
                    spacer(3),

                    itemTitle("Plataforma de Encuestas Digitales", "2024"),
                    itemSubtitle("Next.js · TypeScript · PostgreSQL · TailwindCSS"),
                    bullet("Sistema de encuestas con panel admin, estadísticas y exportación a Excel."),
                    bullet("Validación en tiempo real, stepper interactivo y resultados estilo Google Forms."),
                    spacer(3),

                    itemTitle("Dashboard de Analítica y Reportes", "2024"),
                    itemSubtitle("React · Node.js · Chart.js · MySQL"),
                    bullet("Panel de control con KPIs, gráficas interactivas y filtros por fecha."),
                    bullet("Exportación de reportes en Excel con diseño profesional."),
                    spacer(3),

                    itemTitle("Sistema de Facturación y Prorrateo", "2025"),
                    itemSubtitle("Laravel · PHP · Alpine.js · MySQL"),
                    bullet("Módulo de configuración de tarifas por tipo de cliente e historial de pagos."),
                    bullet("Simulador de cálculos con corrección de errores en tiempo real."),
                    spacer(4),

                    // ── HABILIDADES TÉCNICAS ────────────────────────────────────────────
                    sectionTitle("Habilidades Técnicas"),
                    spacer(2),
                    skillsTable([
                        "React.js & Next.js",
                        "Node.js & Express",
                        "TypeScript",
                        "PHP & Laravel",
                        "TailwindCSS",
                        "MySQL & PostgreSQL",
                        "MongoDB",
                        "Git & GitHub",
                        "Docker (básico)",
                        "REST APIs & GraphQL",
                        "Figma (UI/UX)",
                        "Linux",
                    ]),
                    spacer(4),

                    // ── HABILIDADES BLANDAS ─────────────────────────────────────────────
                    sectionTitle("Habilidades Blandas"),
                    spacer(2),
                    skillsTable([
                        "Trabajo en equipo",
                        "Resolución de problemas",
                        "Comunicación efectiva",
                        "Aprendizaje continuo",
                        "Gestión del tiempo",
                        "Atención al detalle",
                    ]),
                    spacer(4),

                    // ── IDIOMAS ─────────────────────────────────────────────────────────
                    sectionTitle("Idiomas"),
                    bullet("Español — Nativo"),
                    bullet("Inglés — Nivel básico-intermedio (lectura técnica)"),
                    spacer(4),

                    // ── CERTIFICACIONES / CURSOS ────────────────────────────────────────
                    sectionTitle("Cursos y Certificaciones"),
                    bullet("Desarrollo Web Full Stack — Instituto Continental"),
                    bullet("React & Next.js — Udemy / freeCodeCamp"),
                    bullet("Base de Datos con MySQL — Platzi"),
                    bullet("Git & GitHub — GitHub Education"),
                    spacer(6),

                    // ── FOOTER NOTE ─────────────────────────────────────────────────────
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Portafolio web: portfolio.jhonhuincho.dev  ·  Disponible para proyectos freelance y oportunidades laborales",
                                size: pt(9),
                                color: GRAY,
                                italics: true,
                                font: "Calibri",
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    const outputPath = path.join(__dirname, "public", "cv-jhon-huincho.docx");
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ CV generado en: ${outputPath}`);
}

buildCV().catch(console.error);
