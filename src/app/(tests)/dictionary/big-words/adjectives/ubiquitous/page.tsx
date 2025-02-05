import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Ostentatious</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            existing or being everywhere at the same time : constantly
            encountered
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        Shawarma is the new street meat. Both a late night favourite and a quick
        lunch classic, the Middle Eastern dish is now ubiquitous on the streets
        of Toronto.
      </div>
    </div>
  );
}
