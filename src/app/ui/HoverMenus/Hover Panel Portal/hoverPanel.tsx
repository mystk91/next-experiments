"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./hoverPanel.module.css";
import classNames from "classnames";

/*  Displays a panel when you hover over an element
 *    children       - the elements which the hover event will be given to
 *    panel          - the inputed panel that will be displayed on hover
 *    direction      - the direction which the panel will appear
 *    offset         - adds a gap via padding between the children and the panel, in rem (can be negative also)
 *    align?         - aligns the panel on a side of the children, flows the opposite direction, should be perpendicular of "direction"
 *    shiftRem?      - shifts the panel in rem
 *    shiftPercent?  - shifts the panel, by a percent of the children's width / height, 0 to 100
 *    portalTarget   - the ref to which the panel will be appended to
 */
interface HoverPanelProps {
  children: React.ReactNode;
  panel: React.ReactNode;
  direction: "top" | "right" | "bottom" | "left";
  offset?: number;
  align?: "middle" | "top" | "right" | "left" | "bottom";
  shiftRem?: number;
  shiftPercent?: number;
  role?: string;
  ariaLabelChildren?: string;
  ariaLabelPanel?: string;
  portalTarget?: React.RefObject<HTMLElement>;
}
const positionObject = {
  top: "",
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
  portalTarget,
  direction = "bottom",
  offset = 0.0,
  align = "middle",
  shiftRem = 0.0,
  shiftPercent = 0,
  ariaLabelChildren = "Expandable hover area",
  ariaLabelPanel = "Revealed panel",
}: HoverPanelProps) {
  const [active, setActive] = useState(false);
  const [appear, setAppear] = useState(false);

  const childrenRef = useRef<null | HTMLDivElement>(null);
  const panelRef = useRef<null | HTMLDivElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //Adds the panel
  function addPanel() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActive(true);
    timerRef.current = setTimeout(() => setAppear(true), 50);
  }

  function handleMouseLeave(e: React.MouseEvent) {
    const target = e.relatedTarget as Node | null;
    if (
      (panelRef.current && panelRef.current.contains(target)) ||
      (childrenRef.current && childrenRef.current.contains(target))
    ) {
      return;
    }
    removePanel();
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
      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition);
      return () => {
        window.removeEventListener("resize", calculatePosition);
        window.removeEventListener("scroll", calculatePosition);
      };
    }
  }, [active]);

  //Calculate the position for the panel to appear
  function calculatePosition() {
    if (
      !panelRef.current ||
      !childrenRef.current ||
      !portalTarget ||
      !portalTarget.current
    )
      return;
    const positionCopy = { ...positionObject };

    //Handles the offset
    if (offset < 0) {
      // Moves the panel back over the children
      positionCopy.transform += `translate${
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
    Object.assign(panelRef.current.style, positionCopy);
    let panel = panelRef.current.getBoundingClientRect();

    const child = childrenRef.current.getBoundingClientRect();
    const container = portalTarget.current.getBoundingClientRect();

    // Sets the anchor point of the panel
    const anchorPoints: Record<
      "top" | "right" | "bottom" | "left",
      {
        top: string;
        left: string;
      }
    > = {
      top: {
        top: `${(child.top - container.top - panel.height) / 10}rem`,
        left: `0rem`,
      },
      right: { top: `0rem`, left: `${(child.right - container.left) / 10}rem` },
      bottom: {
        top: `${(child.bottom - container.top) / 10}rem`,
        left: `0rem`,
      },
      left: {
        top: `0rem`,
        left: `${(child.left - container.left - panel.width) / 10}rem`,
      },
    };
    const anchorPoint = anchorPoints[direction];
    positionCopy.top = anchorPoint.top;
    positionCopy.left = anchorPoint.left;

    //Handles the alignment
    const alignments: Record<
      "top" | "right" | "bottom" | "left" | "middle",
      string
    > = {
      top: `translateY(${(child.top - container.top) / 10}rem) `,
      right: `translateX(${
        (child.right - container.left - panel.width) / 10
      }rem) `,
      bottom: `translateY(${
        (child.bottom - container.top - panel.height) / 10
      }rem) `,
      left: `translateX(${(child.left - container.left) / 10}rem) `,
      middle:
        direction === "top" || direction === "bottom"
          ? `translateX(${
              ((child.left + child.right) / 2 -
                container.left -
                panel.width / 2) /
              10
            }rem) `
          : `translateY(${
              ((child.top + child.bottom) / 2 -
                container.top -
                panel.height / 2) /
              10
            }rem) `,
    };
    positionCopy.transform = alignments[align];

    //Handles the shifts
    if (shiftPercent) {
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(${
        direction === "top" || direction === "bottom"
          ? (child.width * shiftPercent) / 1000
          : (child.height * shiftPercent) / 1000
      }rem) `;
    }
    if (shiftRem) {
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(${shiftRem}rem) `;
    }

    // Moves panel if it goes outside the container's bounds
    Object.assign(panelRef.current.style, positionCopy);
    panel = panelRef.current.getBoundingClientRect();
    if (direction === "top" || direction === "bottom") {
      //Moves panel to the bottom if it goe out of bounds to the top
      if (direction === "top") {
        if (panel.top < container.top || panel.top < -child.height / 8) {
          positionCopy.transform += `translateY(${
            (child.height + panel.height) / 10
          }rem) `;
          if (offset < 0) {
            positionCopy.transform += `translateY(${2 * offset}rem) `;
          } else {
            positionCopy.paddingTop = positionCopy.paddingBottom;
            positionCopy.paddingBottom = ``;
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
        positionCopy.transform = ``;
        if (offset < 0) {
          positionCopy.transform += `translateY(${offset}rem) `;
        } else if (offset) {
          positionCopy.paddingLeft = ``;
          positionCopy.paddingRight = ``;
          positionCopy.paddingTop = `${offset}rem`;
        }

        const anchorPoint = anchorPoints[`bottom`];
        positionCopy.top = anchorPoint.top;
        positionCopy.left = anchorPoint.left;

        positionCopy.transform += `translateX(${
          ((child.left + child.right) / 2 - container.left - panel.width / 2) /
          10
        }rem) `;
        Object.assign(panelRef.current.style, positionCopy);
        panel = panelRef.current.getBoundingClientRect();

        let translateX = 0;

        if (panel.right > container.right) {
          translateX = container.right - panel.right;
        }
        if (panel.left + translateX < container.left) {
          translateX = container.left - panel.left;
        }
        positionCopy.transform += `translateX(${translateX / 10}rem) `;
      } else {
        // Moves panel up / down if it goes out of bounds to top / bottom
        let translateY = 0;
        if (panel.bottom > container.bottom) {
          translateY = container.bottom - panel.bottom;
        }
        if (panel.top + translateY < container.top) {
          translateY = container.top - panel.top;
        }
        positionCopy.transform += `translateY(${translateY / 10}rem) `;
      }
    }
    Object.assign(panelRef.current.style, positionCopy);
  }

  return (
    <>
      <div
        ref={childrenRef}
        aria-expanded={active}
        onMouseOver={addPanel}
        onMouseLeave={handleMouseLeave}
        onClick={active ? removePanel : addPanel}
        className={styles.expandable}
        aria-label={ariaLabelChildren}
      >
        {children}
      </div>
      {active &&
        portalTarget &&
        createPortal(
          <div
            className={classNames(styles.panel, {
              [styles.appear]: appear,
            })}
            ref={panelRef}
            role={`region`}
            aria-label={ariaLabelPanel}
            onMouseLeave={handleMouseLeave}
          >
            {panel}
          </div>,
          portalTarget.current as HTMLElement
        )}
    </>
  );
}
