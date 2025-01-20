"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ProgressBar1 from "@/app/ui/progressBar/Progress Bar 1/progressBar";
import ProgressBar2 from "@/app/ui/progressBar/Progress Bar 2/progressBar";
import ProgressBar3 from "@/app/ui/progressBar/Progress Bar 3/progressBar";
import ProgressBar4 from "@/app/ui/progressBar/Progress Bar FullWidth/progressBar";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        height: "max-content",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProgressBar1 percent={70} />
    </div>
  );
}
