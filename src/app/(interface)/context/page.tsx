import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Basic Card 1/card";
import { ContextMenu } from "@/app/ui/ContextMenu/contextMenu";

export default function Page() {
  const items = ["Cut", "Copy", "Paste"];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        columnGap: "1.2rem",
        rowGap: "1.2rem",
      }}
    >
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/coffeeCup.png"
        alt="A stainless steel coffee cup filled with coffee on a stainless steel plate."
        headline="Stainless Steel Coffee Cup"
        description="You will never again have to superglue the broken handle back on your favorite coffee mug because now your favorite coffee mug will be made of indestructible, insulated stainless steel. With our insulated coffee cup, you can ensure that any coffee, cocoa, or cuppa stays hot all morning!"
        button={<button>{"Add to Bag"}</button>}
      />
      <ContextMenu items={items} />
    </div>
  );
}
