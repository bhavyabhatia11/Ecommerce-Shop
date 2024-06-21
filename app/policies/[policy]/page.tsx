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
    <div className="mx-auto my-24 max-w-screen-xl px-4 lg:my-40">
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

      <div className="flex flex-col lg:py-8">
        <div className="py-2 pb-4 text-2xl lg:py-8 lg:text-6xl"> {policy.name}</div>
        <div className="flex flex-col gap-8 lg:mt-8 lg:gap-16">
          <div>
            {' '}
            <Prose
              className="flex flex-col gap-4 font-serif text-sm tracking-wider text-neutral-500 lg:mx-0 lg:gap-8 lg:text-base"
              html={toHTML(policy.description) as string}
            />{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
