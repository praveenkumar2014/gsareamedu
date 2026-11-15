import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "GUIDESOFT Education & AI | Learn. Build. Advance.", description: "Industry-oriented learning, AI skills, hands-on labs and career development from GUIDESOFT." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }