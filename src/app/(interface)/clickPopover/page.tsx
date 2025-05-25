"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Tooltip Test/card";
import Navbar from "@/app/ui/Navbars/Sidebar-Menu-Good-1/navbar";
import Button from "@/app/ui/Buttons/Button Set 1/button";
import ClickPopover from "@/app/ui/Popovers/Click Popover/clickPopover";
import ClickPopoverPortal from "@/app/ui/Popovers/Click Popover Portal/clickPopoverPortal";
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
    >
      {`These is a popover with edge detection`}
    </div>
  );
}

export function AnotherCard({
  containerRef,
  anotherCardRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  anotherCardRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      className={classNames(styles.some_card, {})}
      ref={anotherCardRef}
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1.2rem",
        fontSize: "1.8rem",
      }}
    >
      {`This element is the anchor`}
      <ClickPopoverPortal
        panel={<SomeCard />}
        direction="bottom-right"
        portalTargetRef={containerRef}
        anchorRef={anotherCardRef}
        offset={2.0}
        shiftRem={2.0}
        shiftChildPercent={0}
        shiftPanelPercent={150}
      >
        <Button
          text="Show Popover!"
          variant="primary"
          style={{ backgroundColor: "rgb(140, 140, 140)" }}
        />
      </ClickPopoverPortal>
    </div>
  );
}

export default function Page() {
  const [width, setWidth] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function changeSize() {
    timerRef.current = setInterval(() => {
      let width = Math.floor(Math.random() * 80) + 80;
      setWidth(width);
    }, 1000);
  }

  const anotherCardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        { /** 
        <AnotherCard
          containerRef={containerRef}
          anotherCardRef={anotherCardRef}
        />
        */
}
        {
        <ClickPopoverPortal
          panel={<SomeCard />}
          direction="bottom-right"
          offset={2.0}
          shiftRem={0}
          shiftChildPercent={0}
          shiftPanelPercent={-50}
          portalTargetRef={containerRef}
        >
          <div className={styles.card_wrapper}>
            <Card
              height="40.0rem"
              width="28.0rem"
              src="/images/cards/candle.jpg"
              alt="A lit lavender candle next to a piece of lavender and wax crystals."
              headline="Example"
              description="When we click this card component a popover appears at the edge of it."
              button={<button>{"Add to Bag"}</button>}
            />
          </div>
        </ClickPopoverPortal>
        }
      </div>
    </div>
  );
}
