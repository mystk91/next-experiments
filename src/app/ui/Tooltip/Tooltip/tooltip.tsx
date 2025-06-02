"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./tooltip.module.css";
import classNames from "classnames";

/* A basic tooltip component with an arrow that can be positioned relative to it content
 *  children - pass in a string or a component. Only applies the arrow it its a component
 *  arrowPosition - The position of the arrow relative to the tooltip
 *  shiftPercent - Percentage to shift the arrow relative to the tooltip
 *  autoShift - default true. on edge aligned arrows, this will move the arrow inwards by 20%
 *              If false, the edge aligned arrows will be at the edge of the tooltip and you need to move it with shiftPercent
 *  arrowSize? - Length of the arrow's side, in rem. The arrow will stick out by arrowSize / 1.414 
 *  backgroundColor - Tooltip background color
 *  borderColor - Tooltip border color
 *  borderWidth - Tooltip border width, in rem
 *  borderRadius - Tooltip border radius
 *  color - Tooltip text color
 *  fontSize - Tooltip font size
 *  fontWeight - Tooltip font weight
 *  maxWidth - Tooltip maximum width, can be set to "none" to keep text from wrapping
 *  minHeight - Tooltip minimum height
 *  classNames - Extra tooltip classNames
 *  style - Extra styles for the tooltip box, but not the arrow
 *  id? - Tooltip id, used in aria, not always used because positioning components handle the id
 */
interface TooltipProps {
  children: React.ReactNode;
  arrowPosition: ArrowPosition;
  shiftPercent?: number;
  autoShift?: boolean;
  arrowSize?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  maxWidth?: string;
  minHeight?: string;
  id?: string;
  style?: React.CSSProperties;
}

type ArrowPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "left-top"
  | "left-bottom"
  | "right"
  | "right-top"
  | "right-bottom";
type Side = "top" | "right" | "bottom" | "left";
type Align = "left" | "right" | "top" | "bottom" | "middle";

// Splits the arrow position into a side and an alignment
function parsePosition(arrowPosition: ArrowPosition): {
  side: Side;
  align: Align;
} {
  const [side, align] = arrowPosition.split("-") as [Side, Align?];
  return {
    side: side,
    align: align ?? "middle",
  };
}

export default function Tooltip({
  children,
  arrowPosition,
  id,
  arrowSize = 1.0,
  shiftPercent = 0,
  autoShift = true,
  backgroundColor = "var(--background)",
  color = "var(--foreground)",
  borderColor = "var(--borderColor)",
  borderWidth = 0.1,
  borderRadius = `0.4rem`,
  maxWidth = `18.0rem`,
  fontSize = "1.4rem",
  fontWeight = "500",
  minHeight,
  style,
}: TooltipProps) {
  const { side, align } = parsePosition(arrowPosition);
  const isComponent = typeof children !== "string";
  if (isComponent) {
    maxWidth = "none";
    borderRadius = "0";
  }

  function placeArrow() {
    const arrowStyle: React.CSSProperties = {
      position: "absolute",
      width: `${arrowSize}rem`,
      height: `${arrowSize}rem`,
      backgroundColor,
      borderLeft: `${borderWidth}rem solid ${borderColor}`,
      borderTop: `${borderWidth}rem solid ${borderColor}`,
      zIndex: 100,
    };

    const shifts = {
      left: autoShift ? 20 : 0,
      right: autoShift ? 80 : 100,
      top: autoShift ? 20 : 0,
      bottom: autoShift ? 80 : 100,
      middle: 50,
    };
    const shift = `${shifts[align] + shiftPercent}%`;
    const offset = `-${
      arrowSize / 2 + (isComponent ? 0 : borderWidth / 1.414)
    }rem`;
    switch (side) {
      case "top":
        return {
          ...arrowStyle,
          top: offset,
          left: shift,
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "bottom":
        return {
          ...arrowStyle,
          bottom: offset,
          left: shift,
          transform: "translateX(-50%) rotate(225deg)",
        };
      case "left":
        return {
          ...arrowStyle,
          left: offset,
          top: shift,
          transform: "translateY(-50%) rotate(315deg)",
        };
      case "right":
        return {
          ...arrowStyle,
          right: offset,
          top: shift,
          transform: "translateY(-50%) rotate(135deg)",
        };
      default:
        return {};
    }
  }

  return (
    <div
      className={styles.tooltip}
      id={id}
      role="tooltip"
      style={{
        backgroundColor: isComponent ? `` : backgroundColor,
        color: color,
        border: isComponent ? `` : `${borderWidth}rem solid ${borderColor}`,
        borderRadius: borderRadius,
        maxWidth: maxWidth,
        fontSize: fontSize,
        fontWeight: fontWeight,
        minHeight: minHeight,
        userSelect: isComponent ? "text" : "none",
        ...style,
      }}
    >
      <div style={placeArrow()} />
      <div
        className={classNames(styles.tooltip_message, {
          [styles.padding]: !isComponent,
        })}
        style={{
          backgroundColor: isComponent ? "transparent" : backgroundColor,
          borderRadius: isComponent ? "0" : borderRadius,
        }}
      >
        {children}
      </div>
    </div>
  );
}
