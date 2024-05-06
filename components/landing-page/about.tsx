import { Button } from '@/components/ui/button';
import Ring from 'components/icons/ring';
import { Section } from 'lib/shopify/types';
import { MoveRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const About = ({ data }: { data: Section }) => {
  if (!data) return null;

  return (
    <div className="relative items-center justify-center bg-primary pb-12 lg:pb-24">
      <Ring
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 transform opacity-40"
        height={'80%'}
        width={'80%'}
        color="#c4c4c4"
      />
      <div className="mx-auto mt-8 flex max-w-screen-2xl gap-12 px-4 lg:mt-24">
        <div className="flex w-full flex-col gap-12 lg:mt-20 lg:w-[65%] lg:gap-20">
          <div className="z-1 bottom-0 flex w-1/2 text-2xl text-secondary lg:mx-52 lg:items-center lg:justify-center lg:gap-4 lg:text-5xl">
            {data.title}
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="relative -ml-[20%] h-[103px] w-[185px] overflow-hidden rounded-full lg:ml-0 lg:mt-20 lg:min-h-[194px] lg:min-w-[346px]">
              <Image
                className="object-cover"
                fill
                alt={'about-left'}
                src={data.images[0]?.image.url as string}
              />
            </div>
            <div>
              <div className="z-1 bottom-0 flex w-full items-center gap-4 font-serif text-sm text-secondary lg:text-base">
                {data.description}
              </div>
              <Link href={`/about-us`}>
                <Button
                  variant="secondary"
                  className="mt-8 w-full gap-2 font-serif lg:mt-12 lg:w-auto"
                >
                  More about us
                  <MoveRightIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-[10%] flex w-[35%] flex-col lg:relative lg:right-0">
          <div className="relative h-[220px] w-[160px] overflow-hidden rounded-full lg:h-[476px] lg:w-[343px]">
            <Image
              className="object-cover"
              fill
              alt={'about-left'}
              src={data.images[1]?.image.url as string}
            />
          </div>
          <div className="absolute bottom-0 left-[70%] top-[70%] h-[108px] w-[81px] overflow-hidden lg:left-[50%] lg:h-[234px] lg:w-[175px]">
            <Image
              className="object-cover"
              fill
              alt={'about-left'}
              src={data.images[2]?.image.url as string}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 hidden h-[296px] w-[221px] -translate-x-1/2 translate-y-1/2 transform overflow-hidden rounded-full lg:block">
        <Image
          className="object-cover"
          fill
          alt={'about-left'}
          src={data.images[3]?.image.url as string}
        />
      </div>
    </div>
  );
};
