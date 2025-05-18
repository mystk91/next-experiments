"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./hoverMenu.module.css";
import classNames from "classnames";

/*  Displays a menu when you hover over the child element
 *    children       - the items which the hover event will be given to
 *    content        - the inputed menu component / html
 *    direction      - the direction which the menu will appear
 *    offset         - adds a gap between the children and the content, in px
 *    align?         - aligns the menu on a side of the children, flows the opposite direction, should be perpendicular of "direction"
 *    shiftPixels?   - shifts the menu in px
 *    shiftPercent?  - shifts the menu by a percent of the child's width / height, 0 to 100
 *    extraShift?    - shifts the menu by an extra amount, in px
 */
interface HoverMenuProps {
  children: React.ReactNode;
  content: React.ReactNode;
  direction: "top" | "right" | "bottom" | "left";
  offset?: number;
  align?: "middle" | "top" | "right" | "left" | "bottom";
  shiftPixels?: number;
  shiftPercent?: number;
  role?: string;
  ariaLabel?: string;
}

export default function HoverMenu({
  children,
  content,
  direction = "bottom",
  offset = 0.0,
  align = "middle",
  shiftPixels = 0.0,
  shiftPercent = 0,
  role = "menu",
  ariaLabel = "Menu",
}: HoverMenuProps) {
  const [active, setActive] = useState(false);
  const [appear, setAppear] = useState(false);

  const childrenRef = useRef<null | HTMLDivElement>(null);

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
  const [position, setPosition] = useState(positionObject);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //Adds the menu
  function addMenu() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActive(true);
    timerRef.current = setTimeout(() => setAppear(true), 1);
  }

  //Removes the menu
  function removeMenu() {
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

  //Moves the menu to one of the sides when it becomes active
  useEffect(() => {
    if (childrenRef.current) {
      let positionCopy = { ...positionObject };

      // Adds space between the menu and the children
      const paddingDirections: Record<
        "top" | "right" | "bottom" | "left",
        "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft"
      > = {
        top: "paddingBottom",
        right: "paddingLeft",
        bottom: "paddingTop",
        left: "paddingRight",
      };
      positionCopy[paddingDirections[direction]] = `${offset}rem`;

      // The style for each direction
      const distanceStyles: Record<
        "top" | "right" | "bottom" | "left",
        {
          direction: "top" | "right" | "bottom" | "left";
          distance: string;
        }
      > = {
        top: {
          direction: "bottom",
          distance: `${childrenRef.current.clientHeight}px`,
        },
        right: {
          direction: "left",
          distance: `${childrenRef.current.clientWidth}px`,
        },
        bottom: {
          direction: "top",
          distance: `${childrenRef.current.clientHeight}px`,
        },
        left: {
          direction: "right",
          distance: `${childrenRef.current.clientWidth}px`,
        },
      };
      const distanceStyle = distanceStyles[direction];
      positionCopy[distanceStyle.direction] = distanceStyle.distance;

      if (align === "middle") {
        //Takes the "direction" input
        const shiftStyles: Record<
          "top" | "right" | "bottom" | "left",
          {
            direction: "top" | "right" | "bottom" | "left";
            distance: string;
            transform: string;
          }
        > = {
          top: {
            direction: "left",
            distance: `50%`,
            transform: `translateX(-50%)`,
          },
          right: {
            direction: "top",
            distance: `50%`,
            transform: `translateY(-50%)`,
          },
          bottom: {
            direction: "left",
            distance: `50%`,
            transform: `translateX(-50%)`,
          },
          left: {
            direction: "top",
            distance: `50%`,
            transform: `translateY(-50%)`,
          },
        };
        const shiftStyle = shiftStyles[direction];
        positionCopy[shiftStyle.direction] = shiftStyle.distance;
        positionCopy.transform = shiftStyle.transform;
      } else {
        //Takes the "align" input
        const shiftStyles: Record<
          "top" | "right" | "bottom" | "left",
          {
            direction: "top" | "right" | "bottom" | "left";
            distance: string;
            transform: string;
          }
        > = {
          top: {
            direction: "top",
            distance: `${shiftPercent}%`,
            transform: `translateY(${shiftPixels}px)`,
          },
          right: {
            direction: "right",
            distance: `${shiftPercent}%`,
            transform: `translateX(${-shiftPixels}px)`,
          },
          bottom: {
            direction: "bottom",
            distance: `${shiftPercent}%`,
            transform: `translateY(${-shiftPixels}px)`,
          },
          left: {
            direction: "left",
            distance: `${shiftPercent}%`,
            transform: `translateX(${shiftPixels}px)`,
          },
        };
        const shiftStyle = shiftStyles[align];
        positionCopy[shiftStyle.direction] = shiftStyle.distance;
        positionCopy.transform = shiftStyle.transform;
      }
      setPosition(positionCopy);
    }
    return () => {};
  }, [active]);

  return (
    <div
      ref={childrenRef}
      aria-expanded={active}
      onMouseOver={addMenu}
      onMouseLeave={removeMenu}
      className={styles.expandable}
    >
      {children}
      {active && (
        <div
          className={classNames(styles.menu, {
            [styles.appear]: appear,
          })}
          role={role}
          aria-label={ariaLabel}
          style={{
            ...position,
            ...styles,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
