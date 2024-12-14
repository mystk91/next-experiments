"use client";

import React, { useState } from "react";

/*
 * Displays an inputed tooltip when you hover over an element after an optional delay
 * e - the hover event from an element
 * tooltip - the tooltip that will be displayed
 * delay - the delay that occurs before the tooltip appears
 * follows - tooltip will follow the users cursor
 */
export function useTooltip<T>(
  e: React.MouseEvent,
  tooltip: JSX.Element,
  delay: number,
  follows: boolean
) {
  const [result, setResult] = useState<null | JSX.Element>(null);

  return result;
}
