"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./hoverPanel.module.css";
import classNames from "classnames";

/*  Displays a panel when you hover over an element
 *    children       - the elements which the hover event will be given to
 *    panel          - the inputed panel that will be displayed on hover
 *    direction      - the direction which the panel will appear
 *    offset         - adds a gap via padding between the children and the panel, in rem (can be negative also)
 *    align?         - aligns the panel on a side of the children, flows the opposite direction, should be perpendicular of "direction"
 *    shiftPixels?   - shifts the panel in rem
 *    shiftPercent?  - shifts the panel by a percent of the child's width / height, 0 to 100
 *    containerRef   - confines the panel to the boundaries of a container
 */
interface HoverPanelProps {
  children: React.ReactNode;
  panel: React.ReactNode;
  direction: "top" | "right" | "bottom" | "left";
  offset?: number;
  align?: "middle" | "top" | "right" | "left" | "bottom";
  shiftPixels?: number;
  shiftPercent?: number;
  role?: string;
  ariaLabelChildren?: string;
  ariaLabelPanel?: string;
  containerRef?: React.RefObject<any>;
}
const positionObject = {
  top: "",
  right: "",
  bottom: "",
  left: "",
  paddingTop: "",
  paddingRight: "",
  paddingBottom: "",
  paddingLeft: "",
  transform: "",
};

export default function HoverPanel({
  children,
  panel,
  direction = "bottom",
  offset = 0.0,
  align = "middle",
  shiftPixels = 0.0,
  shiftPercent = 0,
  ariaLabelChildren = "Expandable hover area",
  ariaLabelPanel = "Revealed panel",
  containerRef,
}: HoverPanelProps) {
  const [active, setActive] = useState(false);
  const [appear, setAppear] = useState(false);

  const childrenRef = useRef<null | HTMLDivElement>(null);
  const panelRef = useRef<null | HTMLDivElement>(null);

  const [position, setPosition] = useState(positionObject);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //Adds the panel
  function addPanel() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActive(true);
    timerRef.current = setTimeout(() => setAppear(true), 50);
  }

  //Removes the panel
  function removePanel() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAppear(false);
    timerRef.current = setTimeout(() => setActive(false), 300);
  }

  //Clears the timer
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  //Moves the panel to one of the sides when it becomes active, adds events for positioning
  useEffect(() => {
    if (active) {
      calculatePosition();
      if (containerRef) {
        const handleEvents = () => calculatePosition();
        window.addEventListener("resize", handleEvents);
        window.addEventListener("scroll", handleEvents);
        return () => {
          window.removeEventListener("resize", handleEvents);
          window.removeEventListener("scroll", handleEvents);
        };
      }
    }
  }, [active]);

  //Calculate the position for the panel to appear
  function calculatePosition() {
    const positionCopy = { ...positionObject };
    if (offset < 0) {
      // Moves the panel back over the children
      positionCopy.transform = `translate${
        direction === "top" || direction === "bottom" ? `Y` : `X`
      }(${
        direction === "top" || direction === "left" ? -1 * offset : offset
      }rem) `;
    } else {
      // Adds space between the panel and the children
      const oppositeDirection = {
        top: "Bottom",
        right: "Left",
        bottom: "Top",
        left: "Right",
      }[direction];
      positionCopy[
        `padding${oppositeDirection}` as keyof typeof positionCopy
      ] = `${offset}rem`;
    }

    // Moves the panel to one of the sides
    positionCopy[direction] = `0`;
    positionCopy.transform += `translate${
      direction === "top" || direction === "bottom" ? `Y` : `X`
    }(${direction === "top" || direction === "left" ? `-` : ``}100%) `;

    if (align === "middle") {
      // Aligns the panel to the center
      positionCopy[
        direction === "top" || direction === "bottom" ? `left` : `top`
      ] = `50%`;
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(-50%) `;
    } else {
      // Aligns the panel to a side
      positionCopy[align] = `${shiftPercent}%`;
      positionCopy.transform += `translate${
        align === "top" || align === "bottom" ? `Y` : `X`
      }(${
        align === "right" || align === "bottom" ? `-` : ``
      }${shiftPixels}rem) `;
    }

    // Moves panel if it goes outside the container's bounds
    if (containerRef) {
      if (!panelRef.current || !childrenRef.current) return;
      Object.assign(panelRef.current.style, positionCopy);
      const child = childrenRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      const panel = panelRef.current.getBoundingClientRect();

      if (direction === "top" || direction === "bottom") {
        //Moves panel to the bottom if it goe out of bounds to the top
        if (direction === "top") {
          if (panel.top < container.top || panel.top < -child.height / 8) {
            positionCopy.transform += `translateY(200%) `;
            positionCopy.top = "";
            positionCopy.bottom = "0";
            positionCopy.paddingBottom = ``;
            if (offset < 0) {
              positionCopy.transform += `translateY(${2 * offset}rem) `;
            } else {
              positionCopy.paddingTop = `${offset}rem`;
            }
          }
        }
        // Moves panel right / left if it goes out of bounds to right / left
        let translateX = 0;
        if (panel.right > container.right) {
          translateX = container.right - panel.right;
        }
        if (panel.left + translateX < container.left) {
          translateX = container.left - panel.left;
        }
        positionCopy.transform += `translateX(${translateX / 10}rem)`;
      } else {
        // Moves panel to the bottom if it goes out of bounds to right / left
        if (panel.left < container.left || panel.right > container.right) {
          positionCopy.left = ``;
          positionCopy.right = ``;
          positionCopy.bottom = `0`;
          positionCopy.transform = `translateY(100%) translateX(-50%) `;
          positionCopy[`left`] = `50%`;
          if (offset < 0) {
            positionCopy.transform += `translateY(${offset}rem) `;
          } else {
            positionCopy.paddingLeft = ``;
            positionCopy.paddingRight = ``;
            positionCopy.paddingTop = `${offset}rem`;
          }
          Object.assign(panelRef.current.style, positionCopy);
          const panel = panelRef.current.getBoundingClientRect();
          let translateX = 0;
          if (panel.right > container.right) {
            translateX = container.right - panel.right;
          }
          if (panel.left + translateX < container.left) {
            translateX = container.left - panel.left;
          }
          positionCopy.transform += `translateX(${translateX / 10}rem)`;
        } else {
          // Moves panel up / down if it goes out of bounds to top / bottom
          let translateY = 0;
          if (panel.bottom > container.bottom) {
            translateY = container.bottom - panel.bottom;
          }
          if (panel.top + translateY < container.top) {
            translateY = container.top - panel.top;
          }
          positionCopy.transform += `translateY(${translateY / 10}rem)`;
        }
      }
      Object.assign(panelRef.current.style, positionCopy);
    } else {
      setPosition(positionCopy);
    }
  }

  return (
    <div
      ref={childrenRef}
      aria-expanded={active}
      onMouseOver={addPanel}
      onMouseLeave={removePanel}
      className={styles.expandable}
      aria-label={ariaLabelChildren}
    >
      {children}
      {active && (
        <div
          className={classNames(styles.panel, {
            [styles.appear]: appear,
          })}
          ref={panelRef}
          role={`region`}
          aria-label={ariaLabelPanel}
          style={{
            ...position,
          }}
        >
          {panel}
        </div>
      )}
    </div>
  );
}
