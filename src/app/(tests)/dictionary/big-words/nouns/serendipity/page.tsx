import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Serendipity</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            the phenomenon of finding valuable or agreeable things not sought
            for
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        They found each other by pure serendipity.
      </div>
    </div>
  );
}
