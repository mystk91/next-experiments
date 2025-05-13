"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import styles from "./hoverMenu.module.css";
import classNames from "classnames";

/*  Displays a menu when you hover over the child element
 *    children - the items which the hover event will be given to
 *    content - the inputed menu component / html
 *    direction - the direction which the menu will appear
 *    shift?         - shifts the menu towards one side, should be perpendicular of "direction"
 *    relativeShift  - in percent, shifts the menu by a percent of the hovered child's width / height
 *    extraShift?    - shifts the menu by an extra amount, in rem
 */
interface HoverMenuProps {
  children: React.ReactNode;
  content: React.ReactNode;
  direction: "top" | "right" | "bottom" | "left";
  offset?: number;
  shift?: "none" | "top" | "right" | "left" | "bottom";
  relativeShift?: number;
  extraShift?: number;
  role?: string;
  ariaLabel?: string;
}

export default function HoverMenu({
  children,
  content,
  direction = "bottom",
  offset = 0.0,
  shift = "none",
  extraShift = 0.0,
  relativeShift = 0,
  role = "menu",
  ariaLabel = "Menu",
}: HoverMenuProps) {
  const [active, setActive] = useState(false);
  const [appear, setAppear] = useState(false);
  const hoverMenuRef = useRef<null | HTMLDivElement>(null);
  const childrenRef = useRef<null | HTMLDivElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [position, setPosition] = useState({
    transform: "",
    paddingTop: "",
    paddingRight: "",
    paddingBottom: "",
    paddingLeft: "",
  });

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
    timerRef.current = setTimeout(() => setActive(false), 400);
  }

  //Clears the timer
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  //Moves the tooltip to one of the sides when it becomes active
  useEffect(() => {
    if (hoverMenuRef.current && childrenRef.current) {
      let positionCopy = { ...position };

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

      //translate instead





   
      setPosition(positionCopy);
    }
    return () => {};
  }, [active]);

  return (
    <div
      className={styles.hoverMenuWrapper}
      onMouseOver={addMenu}
      onMouseLeave={removeMenu}
    >
      {active && (
        <div
          ref={hoverMenuRef}
          className={classNames(styles.hoverMenu, {
            [styles.appear]: appear,
          })}
          role={role}
          aria-label={ariaLabel}
          style={{
            ...position,
            ...styles,
          }}
        >
          <div className={styles.content}>{content}</div>
        </div>
      )}
      <div ref={childrenRef} aria-expanded={active}>
        {children}
      </div>
    </div>
  );
}
