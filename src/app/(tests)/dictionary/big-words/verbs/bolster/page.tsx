import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Bolster</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            to support with or as if with a bolster
          </div>
        </li>
        <li>
          <div className={styles.definition}>to give a boost to</div>
        </li>
      </ol>
      <div className={styles.example}>
        She came with me to bolster my confidence.
      </div>
    </div>
  );
}
