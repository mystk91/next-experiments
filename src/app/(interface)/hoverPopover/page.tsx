"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Tooltip Test/card";
import Navbar from "@/app/ui/Navbars/Sidebar-Menu-Good-1/navbar";
import Button from "@/app/ui/Buttons/Button Set 1/button";
import HoverPopover from "@/app/ui/Popovers/Hover Popover/hoverPopover"
import HoverPopoverPortal from "@/app/ui/Popovers/Hover Popover Portal/hoverPopoverPortal";
import { useRef } from "react";
import classNames from "classnames";
import { useState } from "react";

export function SomeCard({
  triggerCloseAnimation,
}: {
  triggerCloseAnimation?: boolean;
}) {
  return (
    <div
      className={classNames(styles.some_card, {
        [styles.closing]: triggerCloseAnimation,
      })}
    >{`These are words`}</div>
  );
}

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
        onClick={changeSize}
      >
        <HoverPopover
          panel={<SomeCard />}
          /*
          panel={<Navbar />}
          content={
            <Button
              text="Click Me!"
              variant="primary"
              style={{ backgroundColor: "rgb(140, 140, 140)" }}
            />
          }
            */
          direction="bottom"
          offset={2.0}
          align="left"
          shiftRem={0}
          shiftChildPercent={10}
          shiftPanelPercent={-25}
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
        </HoverPopover>
      </div>
    </div>
  );
}
