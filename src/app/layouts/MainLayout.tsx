import type { Metadata } from "next";
import "@/app/globals.css";
import Banner from "@/app/ui/banner/banner";
import Navbar from "@/app/ui/navbar/navbar";

export const metadata: Metadata = {
  title: "Brifty",
  description: "There's a lot of things over here now isn't there?",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Banner />
        <Navbar />
        {children}
      </body>
    </html>
  );
}