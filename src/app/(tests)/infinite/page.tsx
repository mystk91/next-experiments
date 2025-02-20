import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Infinite from "@/app/ui/Infinite Scrolling/infiniteScroll";

export default function Page() {
  return (
    <div className={styles.page}>
      <Infinite />
    </div>
  );
}
