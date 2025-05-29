"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./hoverTooltip.module.css";
import classNames from "classnames";
import { throttle } from "lodash";

/*  Displays a tooltip when you hover over an element
 *    children       - the elements which the hover event will be given to
 *    tooltip          - the tooltip that will be displayed on hover
 *    tooltipId       - id for the tooltip, used in aria
 *    direction      - the direction which the tooltip will be anchored to
 *    offset         - adds a gap between the children and the tooltip, in rem (can be negative also)
 *    shiftRem?      - shifts the tooltip in rem
 *    shiftChildPercent?  - shifts the tooltip, by a percent of the children's width / height, 0 to 100
 *    shiftTooltipPercent? - shifts the tooltip, by a percent of the tooltip's width / height, 0 to 100
 *    fadeEffect?    - plays the default fade in / out animation, default true
 *    closingTime?    - the time it takes for the tooltip to close, in ms
 *    tooltipRole?          - the role of the tooltip
 *    ariaLabelChildren? - the aria label for the children
 *    ariaLabelTooltip?   - the aria label for the tooltip wrapper
 *    containerRef   - confines the tooltip to the boundaries of a container
 *    focusable         - default true, allows tooltip to appear on tab navigation
 */
interface HoverTooltipProps {
  children: React.ReactNode;
  tooltip: React.ReactNode;
  tooltipId: string;
  direction: Direction;
  offset?: number;
  shiftRem?: number;
  shiftChildPercent?: number;
  shiftTooltipPercent?: number;
  fadeEffect?: boolean;
  closingTime?: number;
  ariaLabelChildren?: string;
  containerRef?: React.RefObject<HTMLElement>;
  focusable?: boolean;
}

type Side = "top" | "right" | "bottom" | "left";
type Align = "left" | "right" | "top" | "bottom" | "middle";
type Direction =
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

// Splits the direction into a side and an alignment
function parseDirection(direction: Direction): { side: Side; align: Align } {
  const [side, align] = direction.split("-") as [Side, Align?];
  return {
    side: side,
    align: align ?? "middle",
  };
}

const positionObject = {
  top: "",
  right: "",
  bottom: "",
  left: "",
  transform: "",
};

export default function HoverTooltip({
  children,
  tooltip,
  tooltipId,
  direction,
  offset = 0.0,
  shiftRem = 0.0,
  shiftChildPercent = 0,
  shiftTooltipPercent = 0,
  fadeEffect = true,
  ariaLabelChildren = "Hover to reveal tooltip",
  closingTime = 300,
  containerRef,
  focusable = true,
}: HoverTooltipProps) {
  const [active, setActive] = useState(false);
  const [closing, setClosing] = useState(false);

  const childrenRef = useRef<null | HTMLDivElement>(null);
  const tooltipRef = useRef<null | HTMLDivElement>(null);

  const [position, setPosition] = useState(positionObject);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //Clears the timer
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Adds the tooltip
  function addTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setClosing(false);
    setActive(true);
  }
  // Removes the tooltip
  function removeTooltip() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setClosing(true);
    timerRef.current = setTimeout(() => {
      setActive(false);
      setClosing(false);
    }, closingTime);
  }

  //Adds the tooltip if the child element is focused or hovered over, removes otherwise
  function updateTooltipStatus() {
    const isFocused = focusable
      ? childrenRef.current?.matches(":focus-visible") ||
        !!childrenRef.current?.querySelector(":focus-visible")
      : false;
    const isHovered = childrenRef.current?.matches(":hover");
    const isNotHovered = !tooltipRef.current?.matches(":hover");
    if (isFocused || (isHovered && isNotHovered)) {
      addTooltip();
    } else {
      removeTooltip();
    }
  }

  //Moves the tooltip to one of the sides when it becomes active, adds events for positioning
  useEffect(() => {
    if (active) {
      calculatePosition();
      if (containerRef) {
        window.addEventListener("resize", throttledCalculatePosition);
        window.addEventListener("scroll", throttledCalculatePosition);
        return () => {
          window.removeEventListener("resize", throttledCalculatePosition);
          window.removeEventListener("scroll", throttledCalculatePosition);
        };
      }
    }
  }, [active]);

  // Calculates the position of the tooltip when the window is resized
  const throttledCalculatePosition = useCallback(
    throttle(() => {
      calculatePosition();
    }, 100),
    []
  );

  // Watches the container for changes in size, and recalculates the position
  useEffect(() => {
    if (!containerRef?.current) return;
    const observer = new ResizeObserver(() => {
      calculatePosition();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  //Calculate the position for the tooltip to appear
  function calculatePosition() {
    const positionCopy = { ...positionObject };
    const { side, align } = parseDirection(direction);
    // Boolean to check if tooltip appears vertically or horizontally
    const verticalDirection = side === "top" || side === "bottom";

    const translates = {
      remX: 0,
      remY: 0,
      percentX: 0,
      percentY: 0,
    };

    if (offset) {
      translates[verticalDirection ? `remY` : `remX`] +=
        side === "top" || side === "left" ? -1 * offset : offset;
    }

    // Moves the tooltip to one of the sides
    positionCopy[side] = `0rem`;
    translates[verticalDirection ? `percentY` : `percentX`] +=
      side === "top" || side === "left" ? -100 : 100;

    if (align === "middle") {
      // Aligns the tooltip to the center
      positionCopy[verticalDirection ? `left` : `top`] = `${
        50 + shiftChildPercent
      }%`;
      translates[verticalDirection ? `percentX` : `percentY`] += -50;
    } else {
      // Aligns the tooltip to a side
      positionCopy[align] = `${
        (align === "top" || align === "left" ? 1 : -1) * shiftChildPercent
      }%`;
    }

    // Shifts the tooltip
    if (shiftRem) {
      translates[verticalDirection ? `remX` : `remY`] += shiftRem;
    }

    if (shiftTooltipPercent) {
      translates[verticalDirection ? `percentX` : `percentY`] +=
        shiftTooltipPercent;
    }
    positionCopy.transform = `translateX(${translates.remX}rem) translateY(${translates.remY}rem) translateX(${translates.percentX}%) translateY(${translates.percentY}%)`;

    // Moves tooltip if it goes outside the container's bounds
    if (containerRef) {
      if (!tooltipRef.current || !childrenRef.current || !containerRef.current)
        return;
      Object.assign(tooltipRef.current.style, positionCopy);
      const child = childrenRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();

      if (verticalDirection) {
        //Moves tooltip to the bottom if it goes out of bounds to the top
        if (side === "top") {
          if (tooltip.top < container.top || tooltip.top < -child.height / 8) {
            translates[`percentY`] += 200;
            positionCopy.top = "";
            positionCopy.bottom = "0";
            if (offset) {
              translates[`remY`] += 2 * offset;
            }
          }
        }
        // Moves tooltip right / left if it goes out of bounds to right / left
        let translateX = 0;
        if (tooltip.right > container.right) {
          translateX = container.right - tooltip.right;
        }
        if (tooltip.left + translateX < container.left) {
          translateX = container.left - tooltip.left;
        }
        translates[`remX`] += translateX / 10;
      } else {
        // Moves tooltip to the bottom if it goes out of bounds to right / left
        if (tooltip.left < container.left || tooltip.right > container.right) {
          positionCopy.left = ``;
          positionCopy.right = ``;
          positionCopy.bottom = `0`;
          translates[`remX`] = 0;
          translates[`remY`] = 0;
          translates[`percentX`] = -50;
          translates[`percentY`] = 100;
          positionCopy[`left`] = `50%`;
          if (offset) {
            translates[`remY`] += offset;
          }
          positionCopy.transform = `translateX(${translates.remX}rem) translateY(${translates.remY}rem) translateX(${translates.percentX}%) translateY(${translates.percentY}%)`;
          Object.assign(tooltipRef.current.style, positionCopy);
          const tooltip = tooltipRef.current.getBoundingClientRect();
          let translateX = 0;
          if (tooltip.right > container.right) {
            translateX = container.right - tooltip.right;
          }
          if (tooltip.left + translateX < container.left) {
            translateX = container.left - tooltip.left;
          }
          translates[`remX`] += translateX / 10;
        } else {
          // Moves tooltip up / down if it goes out of bounds to top / bottom
          let translateY = 0;
          if (tooltip.bottom > container.bottom) {
            translateY = container.bottom - tooltip.bottom;
          }
          if (tooltip.top + translateY < container.top) {
            translateY = container.top - tooltip.top;
          }
          translates[`remY`] += translateY / 10;
        }
      }
      positionCopy.transform = `translateX(${translates.remX}rem) translateY(${translates.remY}rem) translateX(${translates.percentX}%) translateY(${translates.percentY}%)`;
      Object.assign(tooltipRef.current.style, positionCopy);
    } else {
      setPosition(positionCopy);
    }
  }

  // Tells the tooltip to play its closing animation by using the triggerCloseAnimation prop
  // This has to be set up in the tooltip component
  tooltip = React.isValidElement(tooltip)
    ? React.cloneElement(
        tooltip as React.ReactElement<{ triggerCloseAnimation?: boolean }>,
        {
          triggerCloseAnimation: closing,
        }
      )
    : tooltip;

  return (
    <div
      ref={childrenRef}
      aria-expanded={active}
      tabIndex={focusable ? 0 : undefined}
      onMouseEnter={updateTooltipStatus}
      onMouseLeave={updateTooltipStatus}
      onFocus={focusable ? updateTooltipStatus : undefined}
      onBlur={focusable ? updateTooltipStatus : undefined}
      className={styles.expandable}
      aria-label={ariaLabelChildren}
      aria-describedby={tooltipId}
    >
      {children}
      {active && (
        <div
          className={classNames(styles.tooltip_wrapper, {
            [styles.appear]: fadeEffect,
            [styles.closing]: closing && fadeEffect,
          })}
          ref={tooltipRef}
          id={tooltipId}
          style={{
            ...position,
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
