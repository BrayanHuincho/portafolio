import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import ContactEmail from "@/components/emails/ContactEmail";
import { render } from "@react-email/render";
import * as React from "react";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Faltan campos requeridos" },
                { status: 400 }
            );
        }

        // Configurar el transportador SMTP usando Gmail
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        // Renderizar nuestro diseño Premium a HTML compatible con email
        const emailHtml = await render(
            ContactEmail({ name, email, subject, message }) as React.ReactElement
        );

        // Enviar correo
        const result = await transport.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to: process.env.EMAIL_TO_RECEIVE || process.env.MAIL_USERNAME,
            replyTo: email, // Para que puedas responder directamente dándole a "Responder" en Gmail
            subject: `🚨 Nuevo mensaje del Portafolio: ${subject}`,
            html: emailHtml,
        });

        return NextResponse.json(
            { success: true, message: "Correo enviado exitosamente", id: result.messageId },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error enviando email SMTP:", error);
        return NextResponse.json(
            { error: "Error interno del servidor", details: error instanceof Error ? error.message : "Desconocido" },
            { status: 500 }
        );
    }
}
