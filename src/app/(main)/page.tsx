import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Homepage from "../ui/pages/homepage/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
  description: `This is a description about the page`,
};

export default function Page() {
  return <Homepage />;
}
