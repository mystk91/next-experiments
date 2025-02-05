import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Support</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            to promote the interests or cause of
          </div>
        </li>
        <li>
          <div className={styles.definition}>
            to keep from fainting, yielding, or losing courage
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        The senator says that he supports the proposed legislation.
      </div>
    </div>
  );
}
