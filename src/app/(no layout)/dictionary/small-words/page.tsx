import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/small-words/nouns">Nouns</Link>
        <Link href="/dictionary/small-words/verbs">Verbs</Link>
        <Link href="/dictionary/small-words/adjectives">Adjectives</Link>
      </div>
    </div>
  );
}
