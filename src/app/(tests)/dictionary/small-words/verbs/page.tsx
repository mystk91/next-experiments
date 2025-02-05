import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/small-words/verbs/explain">Explain</Link>
        <Link href="/dictionary/small-words/verbs/quicken">Quicken</Link>
        <Link href="/dictionary/small-words/verbs/support">Support</Link>
      </div>
    </div>
  );
}
