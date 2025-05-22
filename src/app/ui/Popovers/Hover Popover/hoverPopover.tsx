"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./hoverPopover.module.css";
import classNames from "classnames";
import { debounce } from "lodash";

/*  Displays a popover panel when you hover over an element
 *    children       - the elements which the hover event will be given to
 *    panel          - the inputed panel that will be displayed on hover
 *    direction      - the direction which the panel will appear
 *    offset         - adds a gap via padding between the children and the panel, in rem (can be negative also)
 *    align?         - aligns the panel on a side of the children, flows the opposite direction, should be perpendicular of "direction"
 *    shiftRem?      - shifts the panel in rem
 *    shiftChildPercent?  - shifts the panel, by a percent of the children's width / height, 0 to 100
 *    shiftPanelPercent? - shifts the panel, by a percent of the panel's width / height, 0 to 100
 *    fadeEffect?    - plays the default fade in / out animation, default true
 *    closingTime?    - the time it takes for the panel to close, in ms
 *    panelRole?          - the role of the panel
 *    ariaLabelChildren? - the aria label for the children
 *    ariaLabelPanel?   - the aria label for the panel
 *    containerRef   - confines the panel to the boundaries of a container
 */
interface HoverPopoverProps {
  children: React.ReactNode;
  panel: React.ReactNode;
  direction: "top" | "right" | "bottom" | "left";
  offset?: number;
  align?: "middle" | "top" | "right" | "left" | "bottom";
  shiftRem?: number;
  shiftChildPercent?: number;
  shiftPanelPercent?: number;
  fadeEffect?: boolean;
  closingTime?: number;
  panelRole?: string;
  ariaLabelChildren?: string;
  ariaLabelPanel?: string;
  containerRef?: React.RefObject<HTMLElement>;
}
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

export default function HoverPopover({
  children,
  panel,
  direction = "bottom",
  offset = 0.0,
  align = "middle",
  shiftRem = 0.0,
  shiftChildPercent = 0,
  shiftPanelPercent = 0,
  fadeEffect = true,
  ariaLabelChildren = "Hover to reveal more information",
  ariaLabelPanel = "Revealed panel",
  panelRole = "dialog",
  closingTime = 300,
  containerRef,
}: HoverPopoverProps) {
  const [active, setActive] = useState(false);
  const [closing, setClosing] = useState(false);

  const childrenRef = useRef<null | HTMLDivElement>(null);
  const panelRef = useRef<null | HTMLDivElement>(null);

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

  // Adds the panel
  function addPanel() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setClosing(false);
    setActive(true);
  }
  // Removes the panel
  function removePanel() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setClosing(true);
    timerRef.current = setTimeout(() => {
      setActive(false);
      setClosing(false);
    }, closingTime);
  }

  //Moves the panel to one of the sides when it becomes active, adds events for positioning
  useEffect(() => {
    if (active) {
      calculatePosition();
      if (containerRef) {
        window.addEventListener("resize", debouncedCalculatePosition);
        window.addEventListener("scroll", debouncedCalculatePosition);
        return () => {
          window.removeEventListener("resize", debouncedCalculatePosition);
          window.removeEventListener("scroll", debouncedCalculatePosition);
        };
      }
    }
  }, [active]);

  // Calculates the position of the panel when the window is resized
  const debouncedCalculatePosition = useCallback(
    debounce(
      () => {
        calculatePosition();
      },
      100,
      { leading: true, trailing: false }
    ),
    [containerRef]
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

  //Calculate the position for the panel to appear
  function calculatePosition() {
    const positionCopy = { ...positionObject };
    if (offset < 0) {
      // Moves the panel back over the children
      positionCopy.transform = `translate${
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

    // Moves the panel to one of the sides
    positionCopy[direction] = `0rem`;
    positionCopy.transform += `translate${
      direction === "top" || direction === "bottom" ? `Y` : `X`
    }(${direction === "top" || direction === "left" ? `-` : ``}100%) `;

    if (align === "middle") {
      // Aligns the panel to the center
      positionCopy[
        direction === "top" || direction === "bottom" ? `left` : `top`
      ] = `${50 + shiftChildPercent}%`;
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(-50%) `;
    } else {
      // Aligns the panel to a side
      positionCopy[align] = `${
        (align === "top" || align === "left" ? 1 : -1) * shiftChildPercent
      }%`;
    }

    // Shifts the panel
    if (shiftRem) {
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(${shiftRem}rem) `;
    }

    if (shiftPanelPercent) {
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(${
        (shiftPanelPercent *
          (direction === "top" || direction === "bottom"
            ? panelRef.current?.clientWidth ?? 0
            : panelRef.current?.clientHeight ?? 0)) /
        1000
      }rem) `;
    }

    // Moves panel if it goes outside the container's bounds
    if (containerRef) {
      if (!panelRef.current || !childrenRef.current || !containerRef.current)
        return;
      Object.assign(panelRef.current.style, positionCopy);
      const child = childrenRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      const panel = panelRef.current.getBoundingClientRect();

      if (direction === "top" || direction === "bottom") {
        //Moves panel to the bottom if it goes out of bounds to the top
        if (direction === "top") {
          if (panel.top < container.top || panel.top < -child.height / 8) {
            positionCopy.transform += `translateY(200%) `;
            positionCopy.top = "";
            positionCopy.bottom = "0";
            positionCopy.paddingBottom = ``;
            if (offset < 0) {
              positionCopy.transform += `translateY(${2 * offset}rem) `;
            } else {
              positionCopy.paddingTop = `${offset}rem`;
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
          positionCopy.left = ``;
          positionCopy.right = ``;
          positionCopy.bottom = `0`;
          positionCopy.transform = `translateY(100%) translateX(-50%) `;
          positionCopy[`left`] = `50%`;
          if (offset < 0) {
            positionCopy.transform += `translateY(${offset}rem) `;
          } else {
            positionCopy.paddingLeft = ``;
            positionCopy.paddingRight = ``;
            positionCopy.paddingTop = `${offset}rem`;
          }
          Object.assign(panelRef.current.style, positionCopy);
          const panel = panelRef.current.getBoundingClientRect();
          let translateX = 0;
          if (panel.right > container.right) {
            translateX = container.right - panel.right;
          }
          if (panel.left + translateX < container.left) {
            translateX = container.left - panel.left;
          }
          positionCopy.transform += `translateX(${translateX / 10}rem)`;
        } else {
          // Moves panel up / down if it goes out of bounds to top / bottom
          let translateY = 0;
          if (panel.bottom > container.bottom) {
            translateY = container.bottom - panel.bottom;
          }
          if (panel.top + translateY < container.top) {
            translateY = container.top - panel.top;
          }
          positionCopy.transform += `translateY(${translateY / 10}rem)`;
        }
      }
      Object.assign(panelRef.current.style, positionCopy);
    } else {
      setPosition(positionCopy);
    }
  }

  // Tells the panel to play its closing animation by using the triggerCloseAnimation prop
  // This has to be set up in the panel component
  panel = React.isValidElement(panel)
    ? React.cloneElement(
        panel as React.ReactElement<{ triggerCloseAnimation?: boolean }>,
        {
          triggerCloseAnimation: closing,
        }
      )
    : panel;

  return (
    <div
      ref={childrenRef}
      aria-expanded={active}
      onMouseOver={addPanel}
      onMouseLeave={removePanel}
      className={styles.expandable}
      aria-label={ariaLabelChildren}
    >
      {children}
      {active && (
        <div
          className={classNames(styles.panel, {
            [styles.appear]: fadeEffect,
            [styles.closing]: closing && fadeEffect,
          })}
          ref={panelRef}
          role={panelRole}
          aria-label={ariaLabelPanel}
          style={{
            ...position,
          }}
        >
          {panel}
        </div>
      )}
    </div>
  );
}
