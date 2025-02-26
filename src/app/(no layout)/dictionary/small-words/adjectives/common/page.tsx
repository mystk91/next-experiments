import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Common</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            occurring or appearing frequently
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        The deer, a common woodland animal...
      </div>
    </div>
  );
}
