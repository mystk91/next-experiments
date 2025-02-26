import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Dashboard from "@/app/ui/Dashboard : Sidebar/sidebar";

export default function Page() {
  return (
    <div className={styles.page}>
      <Dashboard />
    </div>
  );
}
