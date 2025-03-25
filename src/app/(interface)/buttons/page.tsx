"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/app/ui/Buttons/Button Set 1/button";
import NewsIcon from "./news_icon";

export default function Page() {
  const mountain = (
    <Image
      src="/images/wallpapers/wallpaper11.jpg"
      height={512}
      width={512}
      alt={"A luminous night sky filled with stars"}
      style={{ borderRadius: "1rem" }}
    />
  );

  const news = (
    <NewsIcon
      style={{
        backgroundColor: "var(--background)",
        padding: "0rem",
        fill: "var(--foreground)",
      }}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "1rem",
        margin: "0 auto",
        padding: "0 1rem",
      }}
    >
      <Button text="Accept" variant="primary" />
      <Button
        text="This is a good button!"
        variant="secondary"
        onClick={() => {
          console.log(`you hit the good button`);
          alert("noooo");
        }}
      />
      <Button
        text="Options"
        variant="tertiary"
        onClick={() => {
          console.log(`you hit the options button`);
        }}
      />
      <Button
        text="News"
        icon={news}
        variant="secondary"
        width="smallest"
        style={{
          color: "var(--foreground)",
          fontWeight: "500",
          borderColor: "var(--foreground)",
        }}
      />
      <Button text="Starry Stars" icon={mountain} variant="primary" />
    </div>
  );
}
