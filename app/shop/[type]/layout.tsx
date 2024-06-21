import Breadcrumbs from 'components/layout/breadcrums';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto mb-12 mt-24 flex min-h-[80vh] max-w-screen-xl flex-col gap-4 px-4 pb-4 text-black md:flex-col lg:mt-40 lg:gap-4">
        <Breadcrumbs />
        <div className="w-full">{children}</div>
      </div>
    </Suspense>
  );
}
