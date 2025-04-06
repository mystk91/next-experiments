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
import PageProgress from "@/app/ui/progressBar/Page Progress/pageProgress";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "max-content",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PageProgress />
      <div
        style={{ height: "2000px", width: "100vw", backgroundColor: "grey" }}
      ></div>
      <div
        style={{ height: "2000px", width: "100vw", backgroundColor: "white" }}
      ></div>
    </div>
  );
}
