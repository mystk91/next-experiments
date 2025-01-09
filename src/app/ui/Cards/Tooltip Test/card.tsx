"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Tooltip from "@/app/ui/Tooltip/Versatile Tooltip Improved/tooltip";
import FollowTooltip from "@/app/ui/Tooltip/Follow Tooltip/tooltip";
import HoverMenu from "@/app/ui/HoverMenus/HoverMenu/hoverMenu";
import HoverMenuWrapper from "@/app/ui/HoverMenus/HoverMenu Wrapper/hoverMenuWrapper";
import Banner from "@/app/ui/basic_banner/banner";
import Accordian from "../../accordian/accordian";
import Navbar from "@/app/ui/Navbars/Sidebar-Menu-Good-1/navbar";

interface CardProps {
  height: string;
  width: string;
  src: string;
  alt: string;
  headline: string;
  description: string;
  button: JSX.Element;
}

export default function Card({
  height,
  width,
  src,
  alt,
  headline,
  description,
  button,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
      <div
        ref={cardRef}
        className={styles.card}
        style={{
          height: height,
          minHeight: height,
          width: width,
          minWidth: width,
        }}
      >
        <div className={styles.content}>
          <Image
            className={styles.image}
            src={src}
            width={800}
            height={800}
            alt={alt}
          />
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.fade}></div>
          {button}
        </div>
      </div>
  );
}

/*
      <HoverMenu
        ref={cardRef}
        content={<Navbar />}
        direction="bottom"
        borderWidth={0.1}
        arrow={true}
        arrowLength={2.0}
        arrowWidth={0.8}
        offset={1.0}
        arrowPosition="middle"
        shift="middle"
      /> */
