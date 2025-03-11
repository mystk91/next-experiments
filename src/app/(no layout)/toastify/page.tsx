"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import Toast from "@/app/ui/Toast/toast";
import { cssTransition, toast, ToastContainer } from "react-toastify";
import Button from "@/app/ui/Buttons/Button Set 1/button";

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
      autoClose: autoClose === undefined ? true : autoClose,
      duration: duration,
    };
  };

  const toasts = [
    createToast("success", "Your file was uploaded"),
    createToast("warning", "Be careful now", undefined, false),
    createToast("news", "We have a new feature!", undefined, false),
    createToast("error", "Something went wrong."),
    createToast("info", "Here is some useful information."),
    createToast("warning", "You are low on storage", "Custom Warning"),
    createToast("error", "Something went wrong.", ""),
    createToast("info", "You can change this feature in your settings"),
    createToast(
      "error",
      "Something went wrong. Seriously you must have really did something wrong to have this error message appear before you. I don't even know what you can do to fix this. Please reboot all systems."
    ),
  ];

  function showToast() {
    let ourToast = toasts[Math.floor(Math.random() * toasts.length)];

    toast(
      ({ closeToast }) => (
        <Toast
          type={ourToast.type}
          message={ourToast.message}
          title={ourToast.title}
          closeFunction={closeToast}
          autoClose={false}
        />
      ),
      {
        autoClose: ourToast.autoClose ? ourToast.duration : false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        hideProgressBar: true,
        closeButton: false,
        style: {
          width: "max-content",
          height: "max-content",
          boxShadow: "none",
          padding: "0",
          margin: "0",
          background: "none",
        },
        position: "bottom-center",
      }
    );
  }

  const transition = cssTransition({
    enter: "Toastify__bounce-enter--bottom-center",
    exit: "toast-exit-custom",
  });

  return (
    <div className={styles.page}>
      <Button variant={"primary"} text={"Show me a toast!"} onClick={showToast} />
      <ToastContainer transition={transition} limit={6} />
    </div>
  );
}
