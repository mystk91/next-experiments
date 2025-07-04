import React from "react";
import BlankLayout from "@/app/layouts/BlankLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "No Layout",
  description: "This is a blank layout",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlankLayout>{children}</BlankLayout>;
}
