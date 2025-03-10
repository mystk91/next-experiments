"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import AppIcon from "@/app/ui/App Icon/Mobile Icon/app_icon";
import NewsIcon from "./news_icon";
import GeneralIcon from "@/app/ui/App Icon/General Icon/app_icon";

export default function Page() {
  const mountain = (
    <Image
      src="/images/wallpapers/wallpaper11.jpg"
      height={512}
      width={512}
      alt={"A luminous night sky filled with stars"}
    />
  );

  const news = (
    <NewsIcon
      style={{ backgroundColor: "teal", padding: "1rem", fill: "white" }}
    />
  );

  return (
    <div className={styles.page}>
      <div className={styles.icons} style={{ flexDirection: "column" }}>
        <GeneralIcon
          image={mountain}
          notifications={242}
          name={"Starry Stars"}
        />
        <GeneralIcon image={news} name={"News"} />
        <GeneralIcon image={mountain} notifications={5} name={"Starry Stars"} />
      </div>
    </div>
  );
}
