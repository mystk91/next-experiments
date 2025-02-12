import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Rating from "@/app/ui/Rating/Rating/rating";

export default function Page() {
  return (
    <div className={styles.page}>
      <Rating />
    </div>
  );
}
