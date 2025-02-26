import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/big-words/nouns/discrepancy">Discrepancy</Link>
        <Link href="/dictionary/big-words/nouns/metropolis">Metropolis</Link>
        <Link href="/dictionary/big-words/nouns/serendipity">Serendipity</Link>
      </div>
    </div>
  );
}
