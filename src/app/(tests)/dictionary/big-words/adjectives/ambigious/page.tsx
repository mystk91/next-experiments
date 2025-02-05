import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Ambiguous</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            doubtful or uncertain especially from obscurity or indistinctness
          </div>
        </li>
        <li>
          <div className={styles.definition}>
            capable of being understood in two or more possible senses or ways
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        The forensic evidence might have been ambiguous, but Barnhorst said one
        thing seemed clear.
      </div>
    </div>
  );
}
