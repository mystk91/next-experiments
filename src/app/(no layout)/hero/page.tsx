import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Hero from "@/app/ui/Hero/Hero 1/hero";
import Homepage from "@/app/ui/pages/homepage/homepage";
import Footer from "@/app/ui/Footers/Footer 2/footer";
import Hero2 from "@/app/ui/Hero/Hero 2/hero";

export default function Page() {
  return (
    <div className={styles.page}>
      <Hero2 />
      <Homepage />
      <Footer />
    </div>
  );
}
