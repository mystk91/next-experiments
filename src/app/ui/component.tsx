"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./component.module.css";

interface ComponentProps {
  style?: React.CSSProperties;
}

export default function Component({ style }: ComponentProps) {
  const [property, setProperty] = useState<JSX.Element>(<div>Welcome!</div>);

  //componentDidMount, runs when component mounts, then componentDismount
  useEffect(() => {
    return () => {};
  }, []);

  return <div style={{ ...style }}></div>;
}
