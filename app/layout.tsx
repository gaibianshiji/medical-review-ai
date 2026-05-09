import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "医学生 AI 复习助手",
  description: "AI 驱动的医学期末复习问答平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
