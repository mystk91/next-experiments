import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Homepage from "../ui/pages/homepage/homepage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Page",
  description: "This is a new page",
};

export default function Page() {
  return <Homepage />;
}
