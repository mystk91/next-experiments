"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./tooltip.module.css";
import classNames from "classnames";

interface TooltipProps {
  children: React.ReactNode;
  message: string;
  direction?: "top" | "right" | "bottom" | "left";
  delay?: number;
  fontSize?: string;
  height?: string;
  width?: string;
  maxWidth?: string;
  color?: string;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  border?: string;
  borderRadius?: string;
  arrow?: boolean;
  arrowWidth?: number;
  arrowOffset?: number;
  tooltipOffset?: number;
}

export default function Tooltip({
  children,
  message = "This is a tooltip.",
  direction = "top",
  delay = 0,
  fontSize = "1.6rem",
  height = "4.0rem",
  width = "max-content",
  maxWidth = "18.0rem",
  color = "var(--foreground)",
  backgroundColor = "var(--background)",
  borderWidth = 0.1,
  borderColor = "var(--borderColor)",
  borderRadius = "0rem",
  arrow = true,
  arrowWidth = 1.6,
  arrowOffset = 0.875,
  tooltipOffset = 4,
}: TooltipProps) {
  const [active, setActive] = useState(false);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const tooltipRef = useRef<null | HTMLDivElement>(null);
  const [appear, setAppear] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  function addTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActive(true);
    timerRef.current = setTimeout(() => setAppear(true), 1 + delay);
  }

  function removeTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAppear(false);
    timerRef.current = setTimeout(() => setActive(false), 500);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (tooltipRef.current) {
      setDimensions({
        height:
          tooltipRef.current.clientHeight + arrowWidth / 1.4 + tooltipOffset,
        width:
          tooltipRef.current.clientWidth + arrowWidth / 1.4 + tooltipOffset,
      });
    }
    return () => {};
  }, [active]);

  return (
    <div
      className={styles.tooltip_wrapper}
      onMouseOver={addTooltip}
      onMouseLeave={removeTooltip}
    >
      {active && (
        <div
          ref={tooltipRef}
          className={classNames(styles.tooltip, {
            [styles.appear]: appear,
          })}
          role="tooltip"
          style={{
            top: direction === "top" ? `-${dimensions.height}px` : "",
            right: direction === "right" ? `-${dimensions.width}px` : "",
            bottom: direction === "bottom" ? `-${dimensions.height}px` : "",
            left: direction === "left" ? `-${dimensions.width}}px` : "",
            backgroundColor: backgroundColor,
            border: `${borderWidth}rem solid ${borderColor}`,
            borderRadius: borderRadius,
          }}
        >
          {arrow ? (
            <div
              className={styles.tooltip_arrow}
              style={{
                top: direction === "bottom" ? `-${arrowOffset}` : "",
                right: direction === "left" ? `-${arrowOffset}` : "",
                bottom: direction === "top" ? `-${arrowOffset}` : "",
                left: direction === "right" ? `-${arrowOffset}` : "",
                height: arrowWidth,
                width: arrowWidth,
                backgroundColor: backgroundColor,
                borderTop: `${borderWidth}rem solid ${borderColor}`,
                borderLeft: `${borderWidth}rem solid ${borderColor}`,
              }}
            ></div>
          ) : null}
          <div
            className={styles.tooltip_message}
            style={{
              minHeight: height,
              width: width,
              maxWidth: maxWidth,
              fontSize: fontSize,
              color: color,
            }}
          >
            {message}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
