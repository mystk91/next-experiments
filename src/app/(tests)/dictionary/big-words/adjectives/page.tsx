import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/big-words/adjectives/ambigious">Ambigious</Link>
        <Link href="/dictionary/big-words/adjectives/ostentatious">
          Ostentatious
        </Link>
        <Link href="/dictionary/big-words/adjectives/ubiquitous">
          Ubiquitous
        </Link>
      </div>
    </div>
  );
}
