import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Prose from 'components/prose';
import { toHTML } from 'lib/constants';
import { getMetaObjects } from 'lib/shopify';
import { Slash } from 'lucide-react';

// export const runtime = 'edge';

export default async function PolicyPage({ params }: { params?: { policy: string } }) {
  const policies = await getMetaObjects('policies');
  const policy = policies.find((policy: { type: string }) => policy.type === params?.policy);

  return (
    <div className="mx-auto my-40 max-w-screen-2xl px-4">
      <Breadcrumb className="font-serif">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>

          <BreadcrumbItem>Policies</BreadcrumbItem>

          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink href={`/policies/${policy.type}`}>{policy.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex lg:py-8">
        <div className="text-lg lg:w-1/2 lg:text-6xl"> {policy.name}</div>
        <div className="mt-40 flex flex-col gap-8 lg:w-1/2 lg:gap-16">
          <div>
            {' '}
            <Prose
              className="flex flex-col gap-4 font-serif text-sm tracking-widest text-neutral-500 lg:gap-8 lg:text-base"
              html={toHTML(policy.description) as string}
            />{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
