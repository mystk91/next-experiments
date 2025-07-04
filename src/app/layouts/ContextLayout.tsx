import type { Metadata } from "next";
import "@/app/globals.css";
import { UserProvider } from "@/app/functions/context/userContext";

//Retrieves a user from the backend (simulated)
async function getUser() {
  await new Promise((res) => setTimeout(res, 1000));
  let users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@website.com",
      role: "admin",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.net",
      role: "user",
    },
    {
      id: "3",
      name: "Mark Lucas",
      email: "markluke@mysite.com",
      role: "user",
    },
    {
      id: "4",
      name: "Lauren Doe",
      email: "laurdoe@website.com",
      role: "user",
    },
  ];
  return users[Math.floor(Math.random() * users.length)];
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gotUser = await getUser();
  const user = {
    id: gotUser.id,
    email: gotUser.email,
    name: gotUser.name,
  };
  return (
    <html lang="en">
      <body>
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
