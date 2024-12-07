"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Search from "./search";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return <Search query={query} />;
}
