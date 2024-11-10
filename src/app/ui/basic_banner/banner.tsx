"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./banner.module.css";

export default function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerText}>Laatresko</div>
      </div>
    </div>
  );
}
