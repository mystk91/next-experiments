import React from "react";
import BasicLayout from "@/app/layouts/BasicLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BasicLayout>{children}</BasicLayout>;
}
