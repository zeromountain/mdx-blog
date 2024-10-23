import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function WithNextUIProvider({ children }: PropsWithChildren) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
