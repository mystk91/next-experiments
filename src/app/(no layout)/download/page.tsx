"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import Forms from "@/app/ui/Forms/form";
import Downloader from "@/app/ui/Download File/downloadFile";

export default function Page() {
  return (
    <div className={styles.page}>
      <Downloader />
    </div>
  );
}
