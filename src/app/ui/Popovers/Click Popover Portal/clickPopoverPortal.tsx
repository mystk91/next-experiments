"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./clickPopoverPortal.module.css";
import classNames from "classnames";
import { debounce } from "lodash";

/*  Displays a popover panel when you click over an element
 *    children       - the elements which the click event will be given to
 *    panel          - the inputed panel that will be displayed on click
 *    portalTargetRef - the ref to which the panel will be appended to
 *    direction      - the direction which the panel will appear
 *    offset         - adds a gap via padding between the children and the panel, in rem (can be negative also)
 *    align?         - aligns the panel on a side of the children, flows the opposite direction, MUST be perpendicular of "direction"
 *    shiftRem?      - shifts the panel in rem
 *    shiftChildPercent?  - shifts the panel, by a percent of the children's width / height, 0 to 100
 *    shiftPanelPercent? - shifts the panel, by a percent of the panel's width / height, 0 to 100
 *    fadeEffect?    - plays the default fade in / out animation, default true
 *    closingTime?   - the time it takes for the panel to close, in ms
 *    boundaryDetection? - moves the panel if it goes out of bounds of the portalTarget, default true
 *    panelRole?          - the role of the panel
 *    ariaLabelChildren? - the aria label for the children
 *    ariaLabelPanel?   - the aria label for the panel
 */
interface ClickPopoverPortalProps {
  children: React.ReactNode;
  panel: React.ReactNode;
  portalTargetRef: React.RefObject<HTMLElement>;
  direction: "top" | "right" | "bottom" | "left";
  offset?: number;
  align?: "middle" | "top" | "right" | "left" | "bottom";
  shiftRem?: number;
  shiftChildPercent?: number;
  shiftPanelPercent?: number;
  fadeEffect?: boolean;
  closingTime?: number;
  boundaryDetection?: boolean;
  panelRole?: string;
  ariaLabelChildren?: string;
  ariaLabelPanel?: string;
}
const positionObject = {
  top: "",
  left: "",
  paddingTop: "",
  paddingRight: "",
  paddingBottom: "",
  paddingLeft: "",
  transform: "",
};

export default function HoverPopoverPortal({
  children,
  panel,
  portalTargetRef,
  direction = "bottom",
  offset = 0.0,
  align = "middle",
  shiftRem = 0.0,
  shiftChildPercent = 0,
  shiftPanelPercent = 0,
  fadeEffect = true,
  closingTime = 300,
  boundaryDetection = true,
  panelRole = "dialog",
  ariaLabelChildren = "Click to reveal more information",
  ariaLabelPanel = "Revealed panel",
}: ClickPopoverPortalProps) {
  const [active, setActive] = useState(false);
  const [closing, setClosing] = useState(false);

  const childrenRef = useRef<null | HTMLDivElement>(null);
  const panelRef = useRef<null | HTMLDivElement>(null);

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

  // Remove the panel if the user clicks outside of it
  function handleClick(e: MouseEvent) {
    if (!panelRef.current || !panelRef.current.contains(e.target as Node)) {
      removePanel();
    }
  }

  //Moves the panel to one of the sides when it becomes active, adds events for positioning
  useEffect(() => {
    if (active) {
      calculatePosition();
      document.addEventListener("click", handleClick);
      window.addEventListener("resize", debouncedCalculatePosition);
      window.addEventListener("scroll", debouncedCalculatePosition);
      return () => {
        window.removeEventListener("resize", debouncedCalculatePosition);
        window.removeEventListener("scroll", debouncedCalculatePosition);
        document.removeEventListener("click", handleClick);
      };
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
    [portalTargetRef]
  );

  // Watches the portal target for changes in size, and recalculates the position
  useEffect(() => {
    if (!portalTargetRef?.current) return;
    const observer = new ResizeObserver(() => {
      calculatePosition();
    });
    observer.observe(portalTargetRef.current);
    return () => observer.disconnect();
  }, [portalTargetRef]);

  //Calculate the position for the panel to appear
  function calculatePosition() {
    if (
      !panelRef.current ||
      !childrenRef.current ||
      !portalTargetRef ||
      !portalTargetRef.current
    )
      return;
    const positionCopy = { ...positionObject };

    const translate = {
      x: 0,
      y: 0,
    };

    //Handles the offset
    if (offset) {
      // Moves the panel back over the children
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `Y` : `X`
      }(${
        direction === "top" || direction === "left" ? -1 * offset : offset
      }rem) `;
    }

    let panel = panelRef.current.getBoundingClientRect();
    const child = childrenRef.current.getBoundingClientRect();
    const container = portalTargetRef.current.getBoundingClientRect();

    // Sets the anchor point of the panel
    const anchorPoints: Record<
      "top" | "right" | "bottom" | "left",
      {
        top: string;
        left: string;
      }
    > = {
      top: {
        top: `${(child.top - container.top - panel.height) / 10}rem`,
        left: `0rem`,
      },
      right: { top: `0rem`, left: `${(child.right - container.left) / 10}rem` },
      bottom: {
        top: `${(child.bottom - container.top) / 10}rem`,
        left: `0rem`,
      },
      left: {
        top: `0rem`,
        left: `${(child.left - container.left - panel.width) / 10}rem`,
      },
    };
    const anchorPoint = anchorPoints[direction];
    positionCopy.top = anchorPoint.top;
    positionCopy.left = anchorPoint.left;

    //Handles the alignment
    const alignments: Record<
      "top" | "right" | "bottom" | "left" | "middle",
      string
    > = {
      top: `translateY(${(child.top - container.top) / 10}rem) `,
      right: `translateX(${
        (child.right - container.left - panel.width) / 10
      }rem) `,
      bottom: `translateY(${
        (child.bottom - container.top - panel.height) / 10
      }rem) `,
      left: `translateX(${(child.left - container.left) / 10}rem) `,
      middle:
        direction === "top" || direction === "bottom"
          ? `translateX(${
              ((child.left + child.right) / 2 -
                container.left -
                panel.width / 2) /
              10
            }rem) `
          : `translateY(${
              ((child.top + child.bottom) / 2 -
                container.top -
                panel.height / 2) /
              10
            }rem) `,
    };
    positionCopy.transform += alignments[align];

    //Handles the shifts
    if (shiftChildPercent) {
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(${
        direction === "top" || direction === "bottom"
          ? (child.width * shiftChildPercent) / 1000
          : (child.height * shiftChildPercent) / 1000
      }rem) `;
    }

    if (shiftPanelPercent) {
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(${
        direction === "top" || direction === "bottom"
          ? (panel.width * shiftPanelPercent) / 1000
          : (panel.height * shiftPanelPercent) / 1000
      }rem) `;
    }

    if (shiftRem) {
      positionCopy.transform += `translate${
        direction === "top" || direction === "bottom" ? `X` : `Y`
      }(${shiftRem}rem) `;
    }

    if (boundaryDetection) {
      // Moves panel if it goes outside the container's bounds
      Object.assign(panelRef.current.style, positionCopy);
      panel = panelRef.current.getBoundingClientRect();
      if (direction === "top" || direction === "bottom") {
        //Moves panel to the bottom if it goes out of bounds to the top
        if (direction === "top") {
          if (panel.top < container.top || panel.top < -child.height / 8) {
            positionCopy.transform += `translateY(${
              (child.height + panel.height) / 10
            }rem) `;
            if (offset < 0) {
              positionCopy.transform += `translateY(${2 * offset}rem) `;
            } else {
              positionCopy.paddingTop = positionCopy.paddingBottom;
              positionCopy.paddingBottom = ``;
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
          positionCopy.transform = ``;
          if (offset < 0) {
            positionCopy.transform += `translateY(${offset}rem) `;
          } else if (offset) {
            positionCopy.paddingLeft = ``;
            positionCopy.paddingRight = ``;
            positionCopy.paddingTop = `${offset}rem`;
          }

          const anchorPoint = anchorPoints[`bottom`];
          positionCopy.top = anchorPoint.top;
          positionCopy.left = anchorPoint.left;

          positionCopy.transform += `translateX(${
            ((child.left + child.right) / 2 -
              container.left -
              panel.width / 2) /
            10
          }rem) `;
          Object.assign(panelRef.current.style, positionCopy);
          panel = panelRef.current.getBoundingClientRect();

          let translateX = 0;

          if (panel.right > container.right) {
            translateX = container.right - panel.right;
          }
          if (panel.left + translateX < container.left) {
            translateX = container.left - panel.left;
          }
          positionCopy.transform += `translateX(${translateX / 10}rem) `;
        } else {
          // Moves panel up / down if it goes out of bounds to top / bottom
          let translateY = 0;
          if (panel.bottom > container.bottom) {
            translateY = container.bottom - panel.bottom;
          }
          if (panel.top + translateY < container.top) {
            translateY = container.top - panel.top;
          }
          positionCopy.transform += `translateY(${translateY / 10}rem) `;
        }
      }
    }
    Object.assign(panelRef.current.style, positionCopy);
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
    <>
      <div
        ref={childrenRef}
        aria-expanded={active}
        onClick={() => {
          if (!active) addPanel();
        }}
        className={styles.expandable}
        aria-label={ariaLabelChildren}
      >
        {children}
      </div>
      {active &&
        portalTargetRef &&
        createPortal(
          <div
            className={classNames(styles.panel, {
              [styles.appear]: fadeEffect,
              [styles.closing]: closing && fadeEffect,
            })}
            ref={panelRef}
            role={panelRole}
            aria-label={ariaLabelPanel}
          >
            {panel}
          </div>,
          portalTargetRef.current as HTMLElement
        )}
    </>
  );
}
