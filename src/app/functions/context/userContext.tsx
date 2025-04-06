"use client";

import { createContext, useContext } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

const UserContext = createContext<User | null>(null);

export const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("User was not found");
  return context;
};
