"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./multi-signup.module.css";

interface SignupProps {
  style?: React.CSSProperties;
}

export default function Signup({ style }: SignupProps) {
  //For which panel we are currently showing
  const [screen, setScreen] = useState<"email" | "password" | "success">(
    "email"
  );

  function submitEmail(e: FormEvent) {}

  function submitPassword(e: FormEvent) {}

  //componentDidMount, runs when component mounts, then componentDismount
  useEffect(() => {
    return () => {};
  }, []);

  return <div style={{ ...style }}></div>;
}
