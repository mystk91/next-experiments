import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Basic Card 1/card";
import Tooltip from "@/app/ui/Tooltip/Wrapper Versatile Tooltip Improved/tooltip";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        columnGap: "1.2rem",
        rowGap: "1.2rem",
      }}
    >
      <Tooltip
        message="This is a message"
        direction="left"
        borderRadius={0.8}
        borderWidth={0.1}
        arrow={true}
        arrowLength={2.0}
        arrowWidth={0.6}
        arrowPosition="middle"
        shift="middle"
        fontSize={1.6}
      >
        <Card
          height="40.0rem"
          width="28.0rem"
          src="/images/cards/candle.jpg"
          alt="A lit lavender candle next to a piece of lavender and wax crystals."
          headline="Lavender Candle"
          description="One of the best know aromatherapy scents for relaxation is lavender. That's because lavender is a scent that naturally promotes calm. So if you had a stressful day, kick off your shoes, turn on some soothing music, and light a lavender candle. The scent will help relax you, could improve your mood, and help reduce anxiety."
          button={<button>{"Add to Bag"}</button>}
        />
      </Tooltip>
    </div>
  );
}
