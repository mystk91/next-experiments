import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Expedite</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            to make lucid especially by explanation or analysis
          </div>
        </li>
        <li>
          <div className={styles.definition}>
            to give a clarifying explanation
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        When asked for details, he declined to elucidate further.
      </div>
    </div>
  );
}
