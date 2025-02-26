import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>City</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            an inhabited place of greater size, population, or importance than a
            town or village
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        Some major cities are London, Tokyo, and Rome.
      </div>
    </div>
  );
}
