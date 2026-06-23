import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nithin Mancheela | AI Engineer | GTA Vice City Portfolio",
  description: "Playable GTA Vice City-themed portfolio website of Nithin Mancheela, AI Engineer. Featuring retrowave pixel-art, interactive scroll HUD, Web Audio synthesizers, and completed projects.",
  keywords: ["AI Engineer", "Machine Learning", "GTA Vice City", "Portfolio", "Web Developer", "Next.js", "TypeScript"],
  authors: [{ name: "Nithin Mancheela" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
