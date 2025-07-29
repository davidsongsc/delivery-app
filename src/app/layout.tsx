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
  title: "Lojavel Tech",
  description: "Sistema Financeiro com controle de estoque e vendas.",
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  themeColor: '#317EFB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${montserrat.variable} antialiased h-screen ocultar-scroll`}>

        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
