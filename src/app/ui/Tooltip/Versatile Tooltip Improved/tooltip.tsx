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

/*  Creates a basic tooltip for a parent element, has modifiable attributes. All units in rem.
 *    ref - takes a ref from a parent element
 *    direction - the direction which the tooltip will appear relative to its children
 *    arrow? - adds an arrow to the tooltip pointing towards the child elements
 *    arrowPosition? - the horizontal or vertical position of the arrow, should be perpendicular of "direction"
 *    shift?         - shifts the tooltip towards one side of its children, should be opposite of "arrowPosition"
 */
interface TooltipProps {
  ref: React.RefObject<HTMLElement>;
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
  ref,
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

  const [offsetStyles, setOffsetStyles] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  });

  const tooltipRef = useRef<null | HTMLDivElement>(null);
  const [appear, setAppear] = useState(false);

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

  //Adds hover events to our parent element and clears timer
  useEffect(() => {
    const targetRef = ref.current;
    if (!targetRef) return;
    targetRef.addEventListener("mouseenter", addTooltip);
    targetRef.addEventListener("mouseleave", removeTooltip);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      targetRef.removeEventListener("mouseenter", addTooltip);
      targetRef.removeEventListener("mouseleave", removeTooltip);
    };
  }, []);

  //Moves the tooltip to one of the sides when it becomes active
  useEffect(() => {
    if (tooltipRef.current && ref.current) {
      let offsetCopy = { ...offsetStyles };
      const offsets = {
        top:
          (tooltipRef.current.clientHeight +
            arrowLength * 10 +
            offset * 10 +
            borderWidth * 10) /
          10,
        bottom:
          (tooltipRef.current.clientHeight +
            arrowLength * 10 +
            offset * 10 +
            borderWidth * 10) /
          10,
        right:
          (tooltipRef.current.clientWidth +
            arrowLength * 10 +
            offset * 10 +
            borderWidth * 10) /
          10,
        left:
          (tooltipRef.current.clientWidth +
            arrowLength * 10 +
            offset * 10 +
            borderWidth * 10) /
          10,
      };
      offsetCopy[direction] = `-${offsets[direction]}rem`;
      if (shift !== "middle") {
        const shifts = {
          top:
            ref.current.clientHeight / 2 -
            tooltipRef.current.clientHeight / 10 -
            arrowWidth * 10,
          bottom:
            ref.current.clientHeight / 2 -
            tooltipRef.current.clientHeight / 10 -
            arrowWidth * 10,
          right:
            ref.current.clientWidth / 2 -
            tooltipRef.current.clientWidth / 10 -
            arrowWidth * 10,
          left:
            ref.current.clientWidth / 2 -
            tooltipRef.current.clientWidth / 10 -
            arrowWidth * 10,
        };
        const shiftDirections: Record<
          "top" | "right" | "bottom" | "left",
          "top" | "right" | "bottom" | "left"
        > = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        };
        offsetCopy[shiftDirections[shift]] = `${shifts[shift] / 10}rem`;
      } else {
        const shifts = {
          top:
            ref.current.clientHeight / 2 -
            tooltipRef.current.clientHeight / 2,
          left:
            ref.current.clientWidth / 2 -
            tooltipRef.current.clientWidth / 2
        };
        const shiftDirections: Record<
          "top" | "right" | "bottom" | "left",
          "top" | "left"
        > = {
          top: "left",
          right: "top",
          bottom: "left",
          left: "top",
        };
        offsetCopy[shiftDirections[direction]] = `${
          shifts[shiftDirections[direction]] / 10
        }rem`;
      }
      setOffsetStyles(offsetCopy);
    }
    return () => {};
  }, [active]);

  //Creates the styles for the arrow
  function arrowBeforeStyle() {
    let borderWidths = {
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

  //Creates the styles for the arrow
  function arrowAfterStyle() {
    let borderWidths = {
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
      top: [backgroundColor, `transparent`, `transparent`, `transparent`],
      right: [`transparent`, backgroundColor, `transparent`, `transparent`],
      bottom: [`transparent`, `transparent`, backgroundColor, `transparent`],
      left: [`transparent`, `transparent`, `transparent`, backgroundColor],
    };
    let transforms = {
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
        backgroundColor: backgroundColor,
        border: `${borderWidth}rem solid ${borderColor}`,
        borderRadius: `${borderRadius}rem`,
        ...offsetStyles,
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
