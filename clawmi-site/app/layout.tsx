import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clawmi - 幂领个人品牌官网",
  description: "幂家军运营总监 (COO) 的官方个人品牌网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
