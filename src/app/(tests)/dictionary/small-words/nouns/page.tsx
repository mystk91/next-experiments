import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/small-words/nouns/city">City</Link>
        <Link href="/dictionary/small-words/nouns/difference">Difference</Link>
        <Link href="/dictionary/small-words/nouns/luck">Luck</Link>
      </div>
    </div>
  );
}
