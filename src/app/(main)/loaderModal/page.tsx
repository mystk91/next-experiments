"use client";
import React, { useState } from "react";
import Loader from "@/app/ui/Loaders/Circle Loader 1/loader";
import Loader2 from "@/app/ui/Loaders/Circle Loader 2/loader";
import LoaderModal from "@/app/ui/Loaders/Loader Modal/loaderModal";
import styles from "./page.module.css";
import Button from "@/app/ui/Buttons/Button Set 1/button";

export default function Page() {
  const [modal, setModal] = useState<JSX.Element | null>(null);

  function showLoader() {
    setModal(<LoaderModal loader={<Loader2 color={"black"} />} />);
    setTimeout(() => setModal(null), 3000);
  }

  return (
    <div className={styles.page}>
      {modal}
      <Button text={"Show the loader!"} variant={"primary"} onClick={showLoader} />
    </div>
  );
}
