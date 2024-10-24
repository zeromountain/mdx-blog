import { PropsWithChildren } from 'react';

import Navigation from '../common/navigation';

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen bg-gray-100 px-4">
      <Navigation />
      <main className="w-full overflow-hidden bg-blue-500">{children}</main>
    </div>
  );
};
