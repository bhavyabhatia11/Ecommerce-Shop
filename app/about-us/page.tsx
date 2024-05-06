import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Ring from 'components/icons/ring';
import Prose from 'components/prose';
import { toHTML } from 'lib/constants';
import { getMetaObjects } from 'lib/shopify';
import { Slash } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function AboutUs() {
  const meta = await getMetaObjects('about_us');
  const aboutUs = meta[0];

  if (!aboutUs) return notFound();

  const { image, title, description } = aboutUs;
  return (
    <div className="mx-auto my-24 max-w-screen-2xl px-4 lg:my-40 ">
      <Breadcrumb className="font-serif">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink href={`/about-us`}>About Us</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-2 pb-4 text-2xl lg:py-8 lg:text-6xl"> About us </div>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="relative justify-center text-lg lg:w-2/5 lg:text-6xl">
          <Ring
            className="absolute bottom-0 left-[30%] mx-auto -mb-20 hidden opacity-20 lg:block"
            height={'100%'}
            width={'120%'}
            color="#c4c4c4"
          />
          <Ring
            className="absolute bottom-0 left-[30%] mx-auto -mb-20 hidden opacity-80 lg:block"
            height={'60%'}
            width={'80%'}
            color="#c4c4c4"
          />
          <div className="relative mx-auto aspect-[10/9] max-w-[452px] overflow-hidden  rounded-lg lg:aspect-[3/5]">
            <Image
              className="object-cover"
              fill
              alt={image?.altText as string}
              src={image?.url as string}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:w-3/5 lg:gap-16">
          <div className="text-xl lg:text-6xl">{title}</div>
          <div className="lg:ml-20">
            <Prose
              className="flex flex-col gap-4 font-serif text-sm tracking-wider text-neutral-500 lg:gap-8 lg:text-base"
              html={toHTML(description) as string}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
