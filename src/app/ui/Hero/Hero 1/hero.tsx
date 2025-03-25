"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";
import HeroNav from "@/app/ui/Hero Nav/Hero Nav 1/heroNav";
import Button from "../../Buttons/Button Set 1/button";

interface HeroProps {
  style?: React.CSSProperties;
}

export default function Hero({ style }: HeroProps) {
  const [property, setProperty] = useState<JSX.Element>(<div>Welcome!</div>);

  //componentDidMount, runs when component mounts, then componentDismount
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={styles.hero} style={{ ...style }}>
      <div className={styles.background_wrapper}></div>
      <div className={styles.nav_wrapper}>
        <HeroNav />
      </div>
      <div className={styles.hero_content_wrapper}>
        <div className={styles.logo_wrapper}></div>
        <div className={styles.heading_wrapper}>
          <h1>{`Unravel Forgotten Mysteries`}</h1>
          <h3>{`Here you can do neat stuff and the get the most value out of it`}</h3>
        </div>
        <div className={styles.buttons_wrapper}></div>
      </div>
    </div>
  );
}
