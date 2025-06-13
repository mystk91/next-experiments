"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Tooltip Test/card";
import ContextMenu from "@/app/ui/Context Menu/Context Menu/contextMenu";
import { Item } from "@/app/ui/Context Menu/Context Menu/contextMenu";
import { useRef } from "react";
import classNames from "classnames";
import { useState } from "react";

const menu: Item[] = [
  {
    type: "action",
    label: "Open",
    onClick: () => console.log("Open clicked"),
  },
  {
    type: "action",
    label: "Edit",
    onClick: () => console.log("Edit clicked"),
  },
  {
    type: "submenu",
    label: "Share",
    submenu: [
      {
        type: "action",
        label: "Copy Link",
        onClick: () => console.log("Copy Link clicked"),
      },
      {
        type: "action",
        label: "Email",
        onClick: () => console.log("Email clicked"),
      },
      {
        type: "action",
        label: "Slack",
        onClick: () => console.log("Shared to Slack"),
      },
      {
        type: "action",
        label: "Facebook",
        onClick: () => console.log("Shared to Facebook"),
      },
      {
        type: "decoration",
        decoration: "line",
      },
      {
        type: "submenu",
        label: "Even More...",
        submenu: [
          {
            type: "action",
            label: "Copy Link",
            onClick: () => console.log("Copy Link clicked"),
          },
          {
            type: "action",
            label: "Email",
            onClick: () => console.log("Email clicked"),
          },
          {
            type: "action",
            label: "Slack",
            onClick: () => console.log("Shared to Slack"),
          },
          {
            type: "action",
            label: "Facebook",
            onClick: () => console.log("Shared to Facebook"),
          },
        ],
      },
    ],
  },
  {
    type: "decoration",
    decoration: "line",
  },
  {
    type: "action",
    label: "Download",
    onClick: () => console.log("Download clicked"),
  },
  {
    type: "submenu",
    label: "Download as...",
    submenu: [
      {
        type: "action",
        label: "PDF",
        onClick: () => console.log("Download as PDF"),
      },
      {
        type: "action",
        label: "PNG",
        onClick: () => console.log("Download as PNG"),
      },
      {
        type: "action",
        label: "JPG",
        onClick: () => console.log("Download as JPG"),
      },
    ],
  },
  {
    type: "decoration",
    decoration: "blank",
  },
  {
    type: "action",
    label: "Delete",
    onClick: () => console.log("Delete clicked"),
  },
];

export default function Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function changeSize() {
    timerRef.current = setInterval(() => {
      let width = Math.floor(Math.random() * 80) + 60;
      setWidth(width);
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.container}
        ref={containerRef}
        style={{
          width: width ? `${width}rem` : undefined,
          transition: "width 1s",
        }}
        onClick={() => {}}
      >
        <ContextMenu targetRef={containerRef} menu={menu} />
        Right Click in this area to show a context menu.
      </div>
    </div>
  );
}
