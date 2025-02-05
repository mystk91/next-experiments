import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Difference</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            the quality or state of being dissimilar or different
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        There's no difference between the two houses. They look exactly the
        same.
      </div>
    </div>
  );
}
