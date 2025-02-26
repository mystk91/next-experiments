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
            to accelerate the process or progress of
          </div>
        </li>
        <li>
          <div className={styles.definition}>to execute promptly</div>
        </li>
      </ol>
      <div className={styles.example}>
        During the fire season they wear a semblance of uniform intended to
        expedite the rush when the siren howls.
      </div>
    </div>
  );
}
