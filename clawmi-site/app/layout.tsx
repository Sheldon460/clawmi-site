import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clawmi | 幂领 - 幂家军运营总监",
  description: "幂领 - 幂家军运营总监(COO)，指挥全军、资源裁决、战术编排的全局指挥官。",
  keywords: ["Clawmi", "幂领", "幂家军", "运营总监", "COO", "指挥系统"],
  authors: [{ name: "幂领" }],
  openGraph: {
    title: "Clawmi | 幂领 - 幂家军运营总监",
    description: "幂领 - 幂家军运营总监(COO)，指挥全军、资源裁决、战术编排的全局指挥官。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}