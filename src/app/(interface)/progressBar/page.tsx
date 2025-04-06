"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ProgressBar1 from "@/app/ui/progressBar/Progress Bar 1/progressBar";
import ProgressBar2 from "@/app/ui/progressBar/Progress Bar 2/progressBar";
import ProgressBar3 from "@/app/ui/progressBar/Progress Bar 3/progressBar";
import ProgressBar4 from "@/app/ui/progressBar/Progress Bar FullWidth/progressBar";
import ProgressBarTop from "@/app/ui/progressBar/Progress Bar Top/progressBar";
import AnimateProgress from "@/app/ui/progressBar/Animate Progress Bar/animateBar";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimateProgress time={600} increment={1} />
    </div>
  );
}
