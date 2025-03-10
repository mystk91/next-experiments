"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import Tag from "@/app/ui/Tags/Versatile Tag/tag";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.tags}>
        <Tag
          label="Skydiving"
          shape="pill"
          size="small"
          backgroundColor="aliceblue"
        />
        <Tag
          label="Tennis"
          shape="pill"
          size="medium"
          backgroundColor="thistle"
        />
        <Tag
          label="Camping"
          shape="pill"
          size="large"
          backgroundColor="darkseagreen"
        />
        <Tag
          label="Sailing"
          shape="pill"
          size="small"
          closeFunction={() => {}}
          backgroundColor="aliceblue"
        />
        <Tag
          label="Rock Climbing"
          shape="pill"
          size="medium"
          closeFunction={() => {}}
          backgroundColor="thistle"
        />
        <Tag
          label="Biking"
          shape="pill"
          size="large"
          closeFunction={() => {}}
        />

        <Tag
          label="Skydiving"
          shape="rectangle"
          size="small"
          backgroundColor="aliceblue"
        />
        <Tag
          label="Tennis"
          shape="rectangle"
          size="medium"
          backgroundColor="thistle"
        />
        <Tag
          label="Cooking"
          shape="rectangle"
          size="large"
          backgroundColor="darkseagreen"
        />
        <Tag
          label="Reading"
          shape="rectangle"
          size="small"
          closeFunction={() => {}}
        />
        <Tag
          label="Golf"
          shape="rectangle"
          size="medium"
          closeFunction={() => {}}
          backgroundColor="thistle"
        />
        <Tag
          label="Biking"
          shape="rectangle"
          size="large"
          closeFunction={() => {}}
          backgroundColor="darkseagreen"
        />
      </div>
    </div>
  );
}
