import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Unclear</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>difficult to understand</div>
        </li>
      </ol>
      <div className={styles.example}>
        Their suggestion for correcting the problem is a bit unclear.
      </div>
    </div>
  );
}
