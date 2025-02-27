import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import PaginationSpa from "@/app/ui/Pagination SPA/pagination_spa";

export default function Page() {
  return (
    <div className={styles.page}>
      <PaginationSpa />
    </div>
  );
}
