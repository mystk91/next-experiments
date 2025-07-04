import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Accordian from "@/app/ui/accordian/accordian";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accordian",
  description: "This is a great accordian example",
};


export default function Page() {
  return (
    <Accordian
      label="Accordian"
      content={
        <ul style={{ listStyle: "none" }}>
          <li>{"We can put a component in here"}</li>
          <li>{"With stuff..."}</li>
          <li>{"Like this..."}</li>
        </ul>
      }
    />
  );
}
