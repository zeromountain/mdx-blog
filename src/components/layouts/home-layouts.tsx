import { PropsWithChildren } from 'react';

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return <main className="h-screen bg-gray-100 px-4">{children}</main>;
};
