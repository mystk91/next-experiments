import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Tooltip from "@/app/ui/Tooltip/Tooltip/tooltip";
import Navbar from "@/app/ui/Navbars/8 Links, 2 Rows/navbar";
import Tag from "@/app/ui/Tags/Versatile Tag/tag";

export default function Page() {
  return (
    <div className={styles.page}>
      <Tooltip
        arrowPosition="bottom-right"
        shiftPercent={0}
        arrowSize={2.0}
        borderWidth={0.1}
        autoShift={true}
        backgroundColor="black"
        borderColor="black"
        id=""
      >
        <Tag
          label="Some Component"
          shape="pill"
          backgroundColor="blue"
          color="white"
          style={{ borderColor: "blue" }}
        />
      </Tooltip>

      <Tooltip
        arrowPosition="bottom"
        shiftPercent={0}
        arrowSize={2.0}
        borderWidth={0.1}
        autoShift={true}
        backgroundColor="grey"
        color="white"
        id=""
      >
        {`This is a tooltip`}
      </Tooltip>
    </div>
  );
}
