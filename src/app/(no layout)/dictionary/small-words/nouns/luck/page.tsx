import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Luck</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            a force that brings good fortune or adversity
          </div>
        </li>
      </ol>
      <div className={styles.example}>We had good luck fishing.</div>
    </div>
  );
}
