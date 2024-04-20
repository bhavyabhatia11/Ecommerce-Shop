import Breadcrumbs from 'components/layout/breadcrums';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto mb-12 mt-40 flex min-h-[80vh] max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-col">
        <Breadcrumbs />
        <div className="w-full">{children}</div>
      </div>
    </Suspense>
  );
}
