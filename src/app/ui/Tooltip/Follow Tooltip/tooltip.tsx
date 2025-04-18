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

/*  Creates a tooltip for a parent element that will follow your cursor while above its child components. It has modifiable attributes. All units in rem.
 *    ref - takes a ref from a parent element
 *    direction - the direction which the tooltip will appear relative to its children
 *    arrow? - adds an arrow to the tooltip pointing towards the child elements
 *    arrowPosition? - the horizontal or vertical position of the arrow, we can also use this to align the tooltip
 */
interface TooltipProps {
  ref: React.RefObject<HTMLElement>;
  message: string;
  direction?: "none" | "top" | "right" | "bottom" | "left";
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
  arrowPosition?: "none" | "middle" | "top" | "right" | "left" | "bottom";
  arrowLength?: number;
  arrowWidth?: number;
}

export default function Tooltip({
  ref,
  message = "",
  direction = "none",
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
  arrowLength = 0.0,
  arrowWidth = 0.0,
}: TooltipProps) {
  const [active, setActive] = useState(false);
  const [tooltipOffset, setTooltipOffset] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<null | HTMLDivElement>(null);
  const [appear, setAppear] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //Adds the tooltip after an optional delay
  function addTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActive(true);
    timerRef.current = setTimeout(() => setAppear(true), 1 + delay);
  }
  //Removes the tooltip
  function removeTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAppear(false);
    timerRef.current = setTimeout(() => setActive(false), 500);
  }

  //Moves the tooltip
  function moveTooltip(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 || x < rect.width || y >= 0 || y < rect.height) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }

  //Adds hover events to our parent element and clears timer
  useEffect(() => {
    const targetRef = ref.current;
    if (!targetRef) return;
    targetRef.addEventListener("mouseenter", addTooltip);
    targetRef.addEventListener("mousemove", moveTooltip);
    targetRef.addEventListener("mouseleave", removeTooltip);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      targetRef.removeEventListener("mouseenter", addTooltip);
      targetRef.removeEventListener("mousemove", moveTooltip);
      targetRef.removeEventListener("mouseleave", removeTooltip);
    };
  }, []);

  useEffect(() => {
    if (tooltipRef.current) {
      let calcOffset = arrowLength * 10 + offset * 10 + borderWidth * 10;
      let alignments = {
        none: 0,
        right: 0.9 * tooltipRef.current.clientWidth - 10 * arrowWidth,
        left: 0.1 * tooltipRef.current.clientWidth + 10 * arrowWidth,
        bottom: 0.9 * tooltipRef.current.clientHeight - 10 * arrowWidth,
        top: 0.1 * tooltipRef.current.clientHeight + 10 * arrowWidth,
        middle:
          direction !== "none"
            ? 0.5 *
              (direction === "top" || direction === "bottom"
                ? tooltipRef.current.clientWidth
                : tooltipRef.current.clientHeight)
            : 0,
      };
      let offsetX = {
        none: calcOffset,
        top: 0 - alignments[arrowPosition],
        right: 5 + calcOffset,
        bottom: 0 - alignments[arrowPosition],
        left: -2 - calcOffset - tooltipRef.current.clientWidth,
      };
      let offsetY = {
        none: calcOffset,
        top: -4 - calcOffset - tooltipRef.current.clientHeight,
        right: 0 - alignments[arrowPosition],
        bottom: 12 + calcOffset,
        left: 0 - alignments[arrowPosition],
      };
      setTooltipOffset({ x: offsetX[direction], y: offsetY[direction] });
    }
    return () => {};
  }, [active]);

  function arrowBeforeStyle() {
    let borderWidths = {
      none: [""],
      top: [`${arrowLength}rem`, `${arrowWidth}rem`, `0`, `${arrowWidth}rem`],
      right: [`${arrowWidth}rem`, `${arrowLength}rem`, `${arrowWidth}rem`, `0`],
      bottom: [
        `0`,
        `${arrowWidth}rem`,
        `${arrowLength}rem`,
        `${arrowWidth}rem`,
      ],
      left: [`${arrowWidth}rem`, `0`, `${arrowWidth}rem`, `${arrowLength}rem`],
    };
    let borderColors = {
      none: [""],
      top: [borderColor, `transparent`, `transparent`, `transparent`],
      right: [`transparent`, borderColor, `transparent`, `transparent`],
      bottom: [`transparent`, `transparent`, borderColor, `transparent`],
      left: [`transparent`, `transparent`, `transparent`, borderColor],
    };
    return {
      borderWidth: borderWidths[direction].join(" "),
      borderColor: borderColors[direction].join(" "),
    };
  }

  function arrowAfterStyle() {
    let borderWidths = {
      none: [""],
      top: [
        `${arrowLength - (arrowLength * borderWidth) / arrowWidth}rem`,
        `${arrowWidth - borderWidth}rem`,
        `0`,
        `${arrowWidth - borderWidth}rem`,
      ],
      right: [
        `${arrowWidth - borderWidth}rem`,
        `${arrowLength - (arrowLength * borderWidth) / arrowWidth}rem`,
        `${arrowWidth - borderWidth}rem`,
        `0`,
      ],
      bottom: [
        `0`,
        `${arrowWidth - borderWidth}rem`,
        `${arrowLength - (arrowLength * borderWidth) / arrowWidth}rem`,
        `${arrowWidth - borderWidth}rem`,
      ],
      left: [
        `${arrowWidth - borderWidth}rem`,
        `0`,
        `${arrowWidth - borderWidth}rem`,
        `${arrowLength - (arrowLength * borderWidth) / arrowWidth}rem`,
      ],
    };
    let borderColors = {
      none: [""],
      top: [backgroundColor, `transparent`, `transparent`, `transparent`],
      right: [`transparent`, backgroundColor, `transparent`, `transparent`],
      bottom: [`transparent`, `transparent`, backgroundColor, `transparent`],
      left: [`transparent`, `transparent`, `transparent`, backgroundColor],
    };
    let transforms = {
      none: "",
      middle: "",
      top: `translateY(${borderWidth}rem)`,
      bottom: `translateY(-${borderWidth}rem)`,
      right: `translateX(-${borderWidth}rem)`,
      left: `translateX(${borderWidth}rem)`,
    };
    return {
      borderWidth: borderWidths[direction].join(" "),
      borderColor: borderColors[direction].join(" "),
      transform: transforms[arrowPosition],
    };
  }

  return active ? (
    <div
      ref={tooltipRef}
      className={classNames(styles.tooltip, {
        [styles.appear]: appear,
      })}
      data-direction={direction}
      data-arrowposition={arrowPosition}
      role="tooltip"
      style={{
        top: mousePosition.y + tooltipOffset.y,
        left: mousePosition.x + tooltipOffset.x,
        backgroundColor: backgroundColor,
        border: `${borderWidth}rem solid ${borderColor}`,
        borderRadius: `${borderRadius}rem`,
      }}
    >
      {arrow ? (
        <>
          <div className={styles.arrow_before} style={arrowBeforeStyle()}></div>
          <div className={styles.arrow_after} style={arrowAfterStyle()}></div>
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
  ) : null;
}
