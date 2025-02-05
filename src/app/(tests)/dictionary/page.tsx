import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(tests)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.links}>
        <Link href="/dictionary/big-words">Big Words</Link>
        <Link href="/dictionary/small-words">Small Words</Link>
      </div>
    </div>
  );
}
