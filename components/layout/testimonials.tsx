'use client';

import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="m-0 w-full items-center justify-center gap-0 p-0"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ dragFree: true, loop: true }}
    >
      <CarouselContent className="item-center m-0 h-full w-[100vw] items-center gap-0 p-0">
        {testimonials.map((testimonial, index) => (
          <CarouselItem className="h-full items-center pl-0 md:basis-1/3" key={index}>
            <div className="flex h-full flex-col items-center justify-center p-12 text-center lg:border-r">
              <div className="text-3xl text-neutral-200">{testimonial.description}</div>
              <div className="py-4 text-sm text-neutral-400">{testimonial.name}</div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
