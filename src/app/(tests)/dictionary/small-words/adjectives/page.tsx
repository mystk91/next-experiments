import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/small-words/adjectives/common">Common</Link>
        <Link href="/dictionary/small-words/adjectives/flashy">
          Flashy
        </Link>
        <Link href="/dictionary/small-words/adjectives/unclear">
          Unclear
        </Link>
      </div>
    </div>
  );
}
