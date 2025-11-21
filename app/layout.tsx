import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tailwind Task Planner",
  description: "A polished to-do list built with Next.js, Tailwind CSS, and great UX"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
