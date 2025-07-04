"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ThemeSwitcher from "@/app/ui/Theme Switcher/themeSwitcher";

// Example page for a theme switcher component
export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.content_wrapper}>
        <div className={styles.switcher_wrapper}>
          <ThemeSwitcher />
        </div>

        <div className={styles.example_wrapper}>
          <div
            className={styles.text_wrapper}
          >{`This has some light-dark css`}</div>
        </div>
      </div>
    </div>
  );
}
