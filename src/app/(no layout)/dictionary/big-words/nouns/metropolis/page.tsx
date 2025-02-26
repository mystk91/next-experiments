import Image from "next/image";
import Link from "next/link";
import styles from "@/app/(no layout)/dictionary/page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Metropolis</h1>
      <ol className={styles.definitions}>
        <li>
          <div className={styles.definition}>
            the chief or capital city of a country, state, or region
          </div>
        </li>
        <li>
          <div className={styles.definition}>
            a city regarded as a center of a specified activity
          </div>
        </li>
        <li>
          <div className={styles.definition}> a large important city</div>
        </li>
      </ol>
      <div className={styles.example}>
        New York is a big, teeming metropolis where ambitious people from all
        over come to make their mark.
      </div>
    </div>
  );
}
