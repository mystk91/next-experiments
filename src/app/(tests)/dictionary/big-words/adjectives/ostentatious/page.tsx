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
            attracting or seeking to attract attention, admiration, or envy
            often by gaudiness or obviousness
          </div>
        </li>
      </ol>
      <div className={styles.example}>
        She had driven to Prague from the Netherlands in her Porsche, telling
        friends she didn't give a hoot how ostentatious she might appear to the
        comrades.
      </div>
    </div>
  );
}
