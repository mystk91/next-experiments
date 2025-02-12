import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/app/ui/Buttons/Button Set 1/button";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "1rem",
      }}
    >
      <Button text="Accept" type="primary" />
      <Button text="Cancel" type="secondary" />
      <Button text="Options" type="tertiary" />
    </div>
  );
}
