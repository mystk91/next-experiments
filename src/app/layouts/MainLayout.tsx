import type { Metadata } from "next";
import "@/app/globals.css";
///import Banner from "@/app/ui/banner/banner";
import Banner from "@/app/ui/Hero/Hero 2/hero";
import Navbar from "@/app/ui/navbar/navbar";
//import Navbar from "@/app/ui/Navbars/Descending Menu/navbar";
import Footer from "@/app/ui/Footers/Footer 1/footer";

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
        <Footer />
      </body>
    </html>
  );
}
