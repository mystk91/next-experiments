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
  direction: "top" | "right" | "bottom" | "left";
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
  arrowLength?: number;
  arrowWidth?: number;
  arrowOffset?: number;
  extraOffset?: number;
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
  borderWidth = 0.05,
  borderColor = "var(--borderColor)",
  borderRadius = "0rem",
  arrow = true,
  arrowLength = 1.6,
  arrowWidth = 1.0,
  extraOffset = 0.6,
}: TooltipProps) {
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState(0);
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
      setOffset(
        ((direction === "top" || direction === "bottom"
          ? tooltipRef.current.clientHeight
          : tooltipRef.current.clientWidth) +
          arrowLength * 10 +
          extraOffset * 10 +
          borderWidth * 10) /
          10
      );
    }
    return () => {};
  }, [active]);

  function getClipPath() {
    let ratio = Math.sqrt(Math.pow(borderWidth * 100, 2) / 1.25) / arrowWidth;
    const clipPaths = {
      top: `polygon(100% 0, 50% 100%, 0 0, ${ratio}% 0, 50% ${
        100 - 2 * ratio
      }%, ${100 - ratio}% 0)`,
      right: `polygon(100% 100%, 0 50%, 100% 0, 100% ${ratio}%, ${
        2 * ratio
      }% 50%, ${100 - ratio}% 80%)`,
      bottom: `polygon(0 100%, 50% 0, 100% 100%, ${100 - ratio}% 100%, 50% ${
        2 * ratio
      }%, ${ratio}% 100%)`,
      left: `polygon(0 0, 100% 50%, 0 100%, 0 ${100 - ratio}%, ${
        100 - 2 * ratio
      }% 50%, 0 ${ratio}%)`,
    };
    return clipPaths[direction];
  }

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
          data-direction={direction}
          role="tooltip"
          style={{
            top: direction === "top" ? `-${offset}rem` : "",
            right: direction === "right" ? `-${offset}rem` : "",
            bottom: direction === "bottom" ? `-${offset}rem` : "",
            left: direction === "left" ? `-${offset}rem` : "",
            backgroundColor: backgroundColor,
            border: `${borderWidth}rem solid ${borderColor}`,
            borderRadius: borderRadius,
          }}
        >
          {arrow ? (
            <>
              <div
                className={styles.tooltip_arrow_background}
                style={{
                  height:
                    direction === "top" || direction === "bottom"
                      ? `${arrowLength}rem`
                      : `${arrowWidth}rem`,
                  width:
                    direction === "right" || direction === "left"
                      ? `${arrowLength}rem`
                      : `${arrowWidth}rem`,
                  backgroundColor: backgroundColor,
                }}
              ></div>
              <div
                className={styles.tooltip_arrow}
                style={{
                  height:
                    direction === "top" || direction === "bottom"
                      ? `${arrowLength}rem`
                      : `${arrowWidth}rem`,
                  width:
                    direction === "right" || direction === "left"
                      ? `${arrowLength}rem`
                      : `${arrowWidth}rem`,
                  backgroundColor: borderColor,
                  clipPath: getClipPath(),
                }}
              ></div>
            </>
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
