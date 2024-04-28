'use client';

import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRef } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="m-0 w-full items-center justify-center gap-0 p-0"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent className="item-center m-0 items-center gap-0 p-0">
        {images.map((image, index) => (
          <CarouselItem className="h-full items-center pl-0" key={index}>
            <div className="relative aspect-[4/5] max-h-[858px] w-full overflow-hidden">
              <Image
                className="object-cover"
                fill
                alt={image?.altText as string}
                src={image?.src as string}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
}
