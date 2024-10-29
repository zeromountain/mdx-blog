import { PropsWithChildren } from 'react';

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[calc(100vh-60px)] overflow-auto">
      <main className="mx-auto w-full max-w-screen-lg px-6">{children}</main>
    </div>
  );
};
