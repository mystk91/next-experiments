import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Explain</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>to make known</div>
        </li>
        <li>
          <div className={styles.definition}>
            to give the reason for or cause of
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        The teacher explained the poem to the class.
      </div>
    </div>
  );
}
