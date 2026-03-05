import { Html, Head, Preview, Body, Container, Section, Text, Hr, Row, Column } from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactEmail({
    name,
    email,
    subject,
    message,
}: ContactEmailProps) {
    // Inicial inicial del nombre
    const userInitial = name ? name.charAt(0).toUpperCase() : "U";

    return (
        <Html>
            <Head />
            <Preview>💼 Nueva propuesta de: {name} - Portafolio</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header con gradiente/color */}
                    <Section style={header}>
                        <Text style={headerTitle}>Nuevo Contacto</Text>
                        <Text style={headerSubtitle}>Alguien quiere trabajar contigo</Text>
                    </Section>

                    {/* Tarjeta de información del cliente */}
                    <Section style={infoCard}>
                        <Row>
                            <Column style={{ width: "60px" }}>
                                <div style={avatarContainer}>
                                    <Text style={avatarText}>{userInitial}</Text>
                                </div>
                            </Column>
                            <Column>
                                <Text style={clientName}>{name}</Text>
                                <Text style={clientEmail}>{email}</Text>
                            </Column>
                        </Row>
                    </Section>

                    {/* Cuerpo del Mensaje */}
                    <Section style={messageSection}>
                        <Text style={label}>📁 ASUNTO</Text>
                        <Text style={subjectText}>{subject}</Text>

                        <Hr style={divider} />

                        <Text style={label}>💬 MENSAJE</Text>
                        <div style={messageBox}>
                            <Text style={messageContent}>{message}</Text>
                        </div>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            Este mensaje fue enviado desde el formulario de tu portafolio web.
                            <br />
                            Puedes responder directamente a este correo para hablar con <strong>{name}</strong>.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// ========================
// ESTILOS PREMIUM
// ========================

const main = {
    backgroundColor: "#f4f5f7",
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
    padding: "40px 0",
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    maxWidth: "600px",
    overflow: "hidden",
};

const header = {
    backgroundColor: "#0F172A", // Slate 900
    padding: "35px 30px",
    textAlign: "center" as const,
};

const headerTitle = {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "800",
    margin: "0",
    letterSpacing: "-0.5px",
};

const headerSubtitle = {
    color: "#6C63FF", // Tu color morado
    fontSize: "15px",
    fontWeight: "600",
    margin: "8px 0 0 0",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
};

const infoCard = {
    padding: "30px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
};

const avatarContainer = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#6C63FF", // Fondo morado para inicial
    display: "flex", // Note: flex might have partial support in some legacy email clients, but works great in Gmail / Apple Mail
};

const avatarText = {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0",
    lineHeight: "48px",
    textAlign: "center" as const,
    width: "100%",
};

const clientName = {
    color: "#1e293b",
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 4px 0",
};

const clientEmail = {
    color: "#64748b",
    fontSize: "15px",
    margin: "0",
    textDecoration: "none",
};

const messageSection = {
    padding: "30px",
    backgroundColor: "#ffffff",
};

const label = {
    color: "#94a3b8",
    fontSize: "12px",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    margin: "0 0 8px 0",
};

const subjectText = {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0",
};

const divider = {
    borderColor: "#f1f5f9",
    margin: "25px 0",
};

const messageBox = {
    backgroundColor: "#f8fafc",
    borderLeft: "4px solid #00D4AA", // Tu color aqua
    padding: "20px",
    borderRadius: "4px 8px 8px 4px",
};

const messageContent = {
    color: "#334155",
    fontSize: "16px",
    lineHeight: "1.7",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
};

const footer = {
    backgroundColor: "#f8fafc",
    padding: "25px 30px",
    textAlign: "center" as const,
    borderTop: "1px solid #e2e8f0",
};

const footerText = {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "0",
};
