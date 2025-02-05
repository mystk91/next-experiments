import React from "react";
import TabsLayout from "@/app/layouts/TabsLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TabsLayout>{children}</TabsLayout>;
}
