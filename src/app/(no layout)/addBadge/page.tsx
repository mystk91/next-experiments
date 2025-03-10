"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import AddBadge from "@/app/ui/Add Badge/Add Badge/addBadge";
import CustomBadge from "@/app/ui/Add Badge/Add Custom Badge/customBadge";
import Card from "@/app/ui/Cards/Basic Card 1/card";

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.stuff}>
        <div style={{ position: "relative" }}>
          <AddBadge label="On Sale!!!" position="right" shape="pill" />
          <Card
            height="35.0rem"
            width="30.0rem"
            src="/images/cards/candle.jpg"
            alt="A lit lavender candle next to a piece of lavender and wax crystals."
            headline="Lavender Candle"
            description="One of the best know aromatherapy scents for relaxation is lavender. That’s because lavender is a scent that naturally promotes calm. So if you had a stressful day, kick off your shoes, turn on some soothing music, and light a lavender candle. The scent will help relax you, could improve your mood, and help reduce anxiety."
            button={<button>{"Add to Bag"}</button>}
          />
        </div>
      </div>
    </div>
  );
}
