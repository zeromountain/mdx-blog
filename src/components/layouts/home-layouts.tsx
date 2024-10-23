import { PropsWithChildren } from "react";

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return <main className="h-screen px-4 bg-gray-100">{children}</main>;
};
