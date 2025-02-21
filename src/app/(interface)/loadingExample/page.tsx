import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Homepage from "@/app/ui/pages/homepage/homepage";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { message: "We fetched some data!" };
}

export default async function Page() {
  const data = await getData();
  return <div>{data.message}</div>;
}
