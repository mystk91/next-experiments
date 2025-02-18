import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Pagination from "@/app/ui/Pagination/pagination";

export default function Page() {
  return (
    <div className={styles.page}>
      <Pagination />
    </div>
  );
}
