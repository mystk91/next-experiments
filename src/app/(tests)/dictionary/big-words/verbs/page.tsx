import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/big-words/verbs/bolster">Bolster</Link>
        <Link href="/dictionary/big-words/verbs/elucidate">Elucidate</Link>
        <Link href="/dictionary/big-words/verbs/expedite">Expedite</Link>
      </div>
    </div>
  );
}
