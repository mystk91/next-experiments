import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Discrepancy</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
          the quality or state of disagreeing or being at variance
          </div>
        </li>
        <li>
          <div className={styles.definition}>an instance of disagreeing or being at variance</div>
        </li>
      </ol>
      <div className={styles.example}>
      If an article is on one machine but not the other, a copy is made to eliminate the discrepancy.
      </div>
    </div>
  );
}
