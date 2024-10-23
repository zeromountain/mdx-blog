import { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

export function WithNextUIProvider({ children }: PropsWithChildren) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
