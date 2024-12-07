import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "UI",
  description: "Let's look at some UI.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        {children}
      </body>
    </html>
  );
}
