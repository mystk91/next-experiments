"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import Toast from "@/app/ui/Toast/toast";

export default function Page() {
  const createToast = (
    type: "success" | "warning" | "error" | "info" | "news",
    message: string,
    title?: string,
    autoClose?: boolean,
    duration?: number
  ) => {
    return {
      type: type,
      message: message,
      title: title,
      autoClose: autoClose,
      duration: duration,
    };
  };

  const [toasts, setToasts] = useState([
    //createToast("success", "Your file was uploaded", "", false),
    createToast("success", "Your file was uploaded"),
    createToast("warning", "Be careful now"),
    createToast("news", "We have a new feature!"),
    createToast("error", "Something went wrong."),
    createToast("info", "Here is some useful information."),
    createToast("warning", "You are low on storage", "Custom Warning"),
    createToast("error", "Something went wrong.", ""),
    createToast("info", "You can change this feature in your settings"),
    createToast(
      "error",
      "Something went wrong. Seriously you must have really did something wrong to have this error message appear before you. I don't even know what you can do to fix this. Please reboot all systems."
    ),
  ]);

  return (
    <div className={styles.page}>
      <div className={styles.toasts}>
        {toasts.map((toast, i) => {
          return (
            <Toast
              type={toast.type}
              message={toast.message}
              closeFunction={() => {
                setToasts((prev) => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ]);
              }}
              title={toast.title}
              autoClose={toast.autoClose}
              duration={toast.duration}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}
