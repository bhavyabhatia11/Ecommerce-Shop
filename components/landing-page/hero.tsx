'use client';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Section } from 'lib/shopify/types';
import Image from 'next/image';
import { Suspense, useRef } from 'react';

export const Hero = ({ data }: { data: Section }) => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnMouseEnter: false, stopOnInteraction: false })
  );

  if (!data) return null;

  return (
    <div className="relative items-center justify-center">
      <Suspense
        fallback={
          <div className="relative aspect-[3/4] h-full max-h-[550px] w-full overflow-hidden" />
        }
      >
        <Carousel
          plugins={[plugin.current]}
          className="z-10 m-0 w-full items-center justify-center gap-0 p-0"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{ loop: true }}
        >
          <CarouselContent className="item-center m-0 items-center gap-0 p-0">
            {data.images.map((item: any, index) => (
              <CarouselItem className="h-full items-center pl-0" key={index}>
                <div className="relative aspect-[3/4] max-h-[80vh] w-full overflow-hidden lg:aspect-[4/3]">
                  <Image
                    className="object-cover"
                    fill
                    alt={item?.image?.altText as string}
                    src={item?.image?.url as string}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="bottom-0 my-12 lg:my-20" />
        </Carousel>
      </Suspense>

      <div className="z-1 absolute bottom-0 my-20 flex w-full items-center justify-center gap-4 text-xl text-primary lg:my-40 lg:text-5xl">
        {data.title}
      </div>
    </div>
  );
};
