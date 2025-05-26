import type { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import ClientLayout from "@/components/layouts/ClientLayout";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Sistema Frontend",
  description: "Sistema Financeiro com Next.js + Zustand + Django",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${montserrat.variable} antialiased h-screen ocultar-scroll`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
