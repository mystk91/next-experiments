import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Tooltip Test/card";

export default function Page() {
  return (
    <div style={{ display: "flex", columnGap: "1.2rem" }}>
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/candle.jpg"
        alt="A lit lavender candle next to a piece of lavender and wax crystals."
        headline="Lavender Candle"
        description="One of the best know aromatherapy scents for relaxation is lavender. That’s because lavender is a scent that naturally promotes calm. So if you had a stressful day, kick off your shoes, turn on some soothing music, and light a lavender candle. The scent will help relax you, could improve your mood, and help reduce anxiety."
        button={<button>{"Add to Bag"}</button>}
      />

      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/coffeeCup.png"
        alt="A stainless steel coffee cup filled with coffee on a stainless steel plate."
        headline="Stainless Steel Coffee Cup"
        description="You will never again have to superglue the broken handle back on your favorite coffee mug because now your favorite coffee mug will be made of indestructible, insulated stainless steel. With our insulated coffee cup, you can ensure that any coffee, cocoa, or cuppa stays hot all morning!"
        button={<button>{"Add to Bag"}</button>}
      />
    </div>
  );
}
