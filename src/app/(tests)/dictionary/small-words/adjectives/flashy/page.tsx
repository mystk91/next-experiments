import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Flashy</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            lacking in substance or flavor
          </div>
        </li>
        <li>
          <div className={styles.definition}>momentarily dazzling</div>
        </li>
      </ol>
      <div className={styles.example}>
        I bought the CD primarily for its flashy cover design.
      </div>
    </div>
  );
}
