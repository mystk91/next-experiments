"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import styles from "./tooltip.module.css";
import classNames from "classnames";

/*  Creates a basic tooltip for its child components, has modifiable attributes. All units in rem.
 *    children - the elements which the tooltip appears on
 *    direction - the direction which the tooltip will appear relative to its children
 *    arrow? - adds an arrow to the tooltip pointing towards the child elements
 *    arrowPosition? - the horizontal or vertical position of the arrow, should be perpendicular of "direction"
 *    shift?         - shifts the tooltip towards one side of its children, should be opposite of "arrowPosition"
 */
interface TooltipProps {
  children: React.ReactNode;
  message: string;
  direction: "top" | "right" | "bottom" | "left";
  offset?: number;
  delay?: number;
  fontSize?: number;
  height?: string;
  width?: string;
  maxWidth?: string;
  color?: string;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  arrow?: boolean;
  arrowPosition?: "middle" | "top" | "right" | "left" | "bottom";
  shift?: "middle" | "top" | "right" | "left" | "bottom";
  arrowLength?: number;
  arrowWidth?: number;
}

export default function Tooltip({
  children,
  message = "",
  direction = "bottom",
  offset = 0.0,
  delay = 0,
  fontSize = 1.4,
  height = "max-content",
  width = "max-content",
  maxWidth = "18.0rem",
  color = "var(--foreground)",
  backgroundColor = "var(--background)",
  borderWidth = 0.1,
  borderColor = "var(--borderColor)",
  borderRadius = 0,
  arrow = false,
  arrowPosition = "middle",
  shift = "middle",
  arrowLength = 0.0,
  arrowWidth = 0.0,
}: TooltipProps) {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [offsetStyles, setOffsetStyles] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  });

  const tooltipRef = useRef<null | HTMLDivElement>(null);
  const childrenRef = useRef<null | HTMLDivElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //Adds the tooltip after an optional delay
  function addTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActive(true);
    timerRef.current = setTimeout(() => setVisible(true), 1 + delay);
  }

  //Removes the tooltip
  function removeTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setVisible(false);
    timerRef.current = setTimeout(() => setActive(false), 500);
  }

  //Clears timer when we dismount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!tooltipRef.current || !childrenRef.current) return;

    const tooltip = tooltipRef.current;
    //parallel vs perpendicular directions
    const tooltipParallel =
      direction === "left" || direction === "right"
        ? tooltip.clientWidth
        : tooltip.clientHeight;

    const offsetAmount =
      (tooltipParallel + arrowLength * 10 + offset * 10 + borderWidth * 10) /
      10;
    const updated = {
      top: "",
      right: "",
      bottom: "",
      left: "",
      [direction]: `-${offsetAmount}rem`,
    };
    if (shift !== "middle") {
      const children = childrenRef.current;

      const tooltipPerpendicular =
        direction === "left" || direction === "right"
          ? tooltip.clientHeight
          : tooltip.clientWidth;

      const childrenPerpendicular =
        direction === "left" || direction === "right"
          ? children.clientHeight
          : children.clientWidth;
      const shiftAmount =
        childrenPerpendicular / 20 -
        (tooltipPerpendicular * 0.15) / 10 -
        arrowWidth;
      const oppositeDirections: Record<string, string> = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left",
      };
      if (oppositeDirections[shift]) {
        updated[oppositeDirections[shift]] = `${shiftAmount}rem`;
      }
    }

    setOffsetStyles(updated);
  }, [active]);

  //Sets the style for the arrow
  function getArrowStyle(position: "before" | "after") {
    const isBefore = position === "before";
    const length = isBefore
      ? arrowLength
      : arrowLength - (arrowLength * borderWidth) / arrowWidth;

    const width = isBefore ? arrowWidth : arrowWidth - borderWidth;

    const borderWidths = {
      top: [`${length}rem`, `${width}rem`, `0`, `${width}rem`],
      right: [`${width}rem`, `${length}rem`, `${width}rem`, `0`],
      bottom: [`0`, `${width}rem`, `${length}rem`, `${width}rem`],
      left: [`${width}rem`, `0`, `${width}rem`, `${length}rem`],
    };
    const borderColors = {
      top: [
        isBefore ? borderColor : backgroundColor,
        "transparent",
        "transparent",
        "transparent",
      ],
      right: [
        "transparent",
        isBefore ? borderColor : backgroundColor,
        "transparent",
        "transparent",
      ],
      bottom: [
        "transparent",
        "transparent",
        isBefore ? borderColor : backgroundColor,
        "transparent",
      ],
      left: [
        "transparent",
        "transparent",
        "transparent",
        isBefore ? borderColor : backgroundColor,
      ],
    };
    const transforms = {
      middle: "",
      top: `translateY(${borderWidth}rem)`,
      bottom: `translateY(-${borderWidth}rem)`,
      right: `translateX(-${borderWidth}rem)`,
      left: `translateX(${borderWidth}rem)`,
    };
    return {
      borderWidth: borderWidths[direction].join(" "),
      borderColor: borderColors[direction].join(" "),
      ...(isBefore ? {} : { transform: transforms[arrowPosition] }),
    };
  }

  return (
    <div className={styles.tooltip_wrapper}>
      {active && (
        <div
          ref={tooltipRef}
          className={classNames(styles.tooltip, {
            [styles.visible]: visible,
          })}
          data-direction={direction}
          data-arrowposition={arrowPosition}
          role="tooltip"
          style={{
            backgroundColor: backgroundColor,
            border: `${borderWidth}rem solid ${borderColor}`,
            borderRadius: `${borderRadius}rem`,
            ...offsetStyles,
          }}
        >
          {arrow ? (
            <>
              <div
                className={styles.arrow_before}
                style={getArrowStyle("before")}
              ></div>
              <div
                className={styles.arrow_after}
                style={getArrowStyle("after")}
              ></div>
            </>
          ) : null}
          <div
            className={styles.tooltip_message}
            style={{
              minHeight: height,
              width: width,
              maxWidth: maxWidth,
              fontSize: `${fontSize}rem`,
              color: color,
            }}
          >
            {message}
          </div>
        </div>
      )}
      <div
        onMouseOver={addTooltip}
        onMouseLeave={removeTooltip}
        ref={childrenRef}
      >
        {children}
      </div>
    </div>
  );
}
