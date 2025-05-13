import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/app/ui/Cards/Tooltip Test/card";
import CardChild from "@/app/ui/Cards/Tooltip as Child Test/card";
import HoverMenuWrapper from "@/app/ui//HoverMenus/HoverMenu Wrapper/hoverMenuWrapper";
import HoverMenuBetter from "@/app/ui/HoverMenus/HoverMenu Wrapper 2/hoverMenuWrapper";
import HoverMenuFlexible from "@/app/ui/HoverMenus/HoverMenu Wrapper 3/hoverMenuWrapper";
import SimpleHover from "@/app/ui/HoverMenus/HoverMenu Wrapper Simple/hoverMenu";
import Navbar from "@/app/ui/Navbars/Sidebar-Menu-Good-1/navbar";

export default function Page() {
  return (
    <SimpleHover
      content={<Navbar />}
      direction="bottom"
      offset={10}
      shift="none"
      extraShift={0}
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
    </SimpleHover>
  );
}
/*
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        columnGap: "1.2rem",
        rowGap: "1.2rem",
      }}
    >
      <CardChild
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/candle.jpg"
        alt="A lit lavender candle next to a piece of lavender and wax crystals."
        headline="Lavender Candle"
        description="One of the best know aromatherapy scents for relaxation is lavender. That's because lavender is a scent that naturally promotes calm. So if you had a stressful day, kick off your shoes, turn on some soothing music, and light a lavender candle. The scent will help relax you, could improve your mood, and help reduce anxiety."
        button={<button>{"Add to Bag"}</button>}
      ></CardChild>
    </div>
  );
}
  */
