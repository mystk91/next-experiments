"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Tooltip Test/card";
import CardChild from "@/app/ui/Cards/Tooltip as Child Test/card";
import HoverMenuWrapper from "@/app/ui//HoverMenus/HoverMenu Wrapper/hoverMenuWrapper";
import HoverMenuBetter from "@/app/ui/HoverMenus/HoverMenu Wrapper 2/hoverMenuWrapper";
import HoverMenuFlexible from "@/app/ui/HoverMenus/HoverMenu Wrapper 3/hoverMenuWrapper";
import Navbar from "@/app/ui/Navbars/Sidebar-Menu-Good-1/navbar";
import Button from "@/app/ui/Buttons/Button Set 1/button";
import HoverPanel from "@/app/ui/HoverMenus/Hover Panel/hoverPanel";
import HoverPanelPortal from "@/app/ui/HoverMenus/Hover Panel Portal/hoverPanel";
import { useRef } from "react";
import classNames from "classnames";

export function SomeCard({ closing }: { closing?: boolean }) {
  return (
    <div
      className={classNames(styles.some_card, { [styles.closing]: closing })}
    >{`These are words`}</div>
  );
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className={styles.page}>
      <div className={styles.container} ref={containerRef}>
        <HoverPanel
          panel={<SomeCard />}
          /*
          content={<Navbar />}
          content={
            <Button
              text="Click Me!"
              variant="primary"
              style={{ backgroundColor: "rgb(140, 140, 140)" }}
            />
          }
            */
          direction="right"
          offset={2.0}
          align="bottom"
          shiftRem={0}
          shiftPercent={0}
          containerRef={containerRef}
        >
          <div className={styles.card_wrapper}>
            <Card
              height="40.0rem"
              width="28.0rem"
              src="/images/cards/candle.jpg"
              alt="A lit lavender candle next to a piece of lavender and wax crystals."
              headline="Lavender Candle"
              description="One of the best know aromatherapy scents for relaxation is lavender. That's because lavender is a scent that naturally promotes calm. So if you had a stressful day, kick off your shoes, turn on some soothing music, and light a lavender candle. The scent will help relax you, could improve your mood, and help reduce anxiety."
              button={<button>{"Add to Bag"}</button>}
            />
          </div>
        </HoverPanel>
      </div>
    </div>
  );
}
