import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Rated from "@/app/ui/Rating/Rated/rated";

export default function Page() {
  return (
    <div className={styles.page}
    >
      <Rated rating={2.5} />
    </div>
  );
}
