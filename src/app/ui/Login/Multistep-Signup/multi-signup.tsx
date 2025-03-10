"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./component.module.css";

interface ComponentProps {
  style?: {};
}

export default function Component({ style }: ComponentProps) {
  const [property, setProperty] = useState<JSX.Element>(<div>Welcome!</div>);
  const propRef = useRef<string>("initialValue");
  function setPropRef(point: string): void {
    propRef.current = point;
  }

  //componentDidMount, runs when component mounts, then componentDismount
  useEffect(() => {
    return () => {};
  }, []);
  //componentDidUpdate, runs after render
  useEffect(() => {}, [property]);

  return <div style={{ ...style }}></div>;
}
