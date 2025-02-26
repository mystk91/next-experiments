import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Quicken</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>to become more rapid</div>
        </li>
      </ol>
      <div className={styles.example}>
        The approach of the deadline quickened our sense of urgency.
      </div>
    </div>
  );
}
