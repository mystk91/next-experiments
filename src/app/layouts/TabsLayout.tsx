import type { Metadata } from "next";
import "@/app/globals.css";
import Tabs from "@/app/ui/Tabs/Circular Tabs Layout/tabs";

export const metadata: Metadata = {
  title: "Tabs",
  description: "A Tabs Layout",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Tabs />
        {children}
      </body>
    </html>
  );
}
