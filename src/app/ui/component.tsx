"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import uniqid from "uniqid";
import Image from "next/image";
import Link from "next/link";
import styles from "./component.module.css";

interface ComponentProps {
  someText: string;
  someBoolean: boolean;
}

export default function Component({ someText, someBoolean }: ComponentProps) {
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

  return <div></div>;
}
