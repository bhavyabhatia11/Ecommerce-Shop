'use client';
import { Button } from '@/components/ui/button';
import { Section } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const PopUp = ({ data }: { data: Section }) => {
  const [popupViewed, setPopupViewed] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const viewed = sessionStorage.getItem('popup_viewed') === 'true';
      setPopupViewed(viewed);
    }
  }, []);

  if (!data) return null;

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('popup_viewed', 'true');
    }

    setPopupViewed(true);
  };

  return (
    <Dialog open={!popupViewed}>
      <DialogContent className="border-none p-0 lg:min-w-[800px] lg:max-w-[1200px]">
        <div className="relative items-center justify-center bg-beige-dark">
          {/* <Ring
            className="absolute left-0 bottom-0 translate-y-1/2 transform overflow-hidden opacity-40"
            height={'80%'}
            width={'80%'}
            color="#c4c4c4"
          /> */}
          <div className="my-12 flex max-w-screen-xl gap-12 px-4 lg:mx-16 ">
            <div className="absolute hidden w-[35%] flex-col lg:relative lg:right-0 lg:flex">
              <div className="relative h-[220px] w-[160px] overflow-hidden rounded-full lg:h-[546px] lg:w-[383px]">
                <Image
                  className="object-cover"
                  fill
                  alt={'about-left'}
                  src={data.images[0]?.image.url as string}
                />
              </div>
              <div className="absolute bottom-0 top-[70%] h-[81px] w-[108px] overflow-hidden rounded-full border border-neutral-300 lg:left-[250px] lg:top-[340px] lg:h-[136px] lg:w-[242px]">
                <Image
                  className="object-cover"
                  fill
                  alt={'about-left'}
                  src={data.images[1]?.image.url as string}
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-12 lg:mt-20 lg:w-[65%] lg:gap-20">
              <div className="z-1 bottom-0 flex text-2xl text-secondary lg:ml-8 lg:w-3/4 lg:gap-4 lg:text-5xl">
                {data.title}
              </div>

              <div className="flex flex-col gap-12 self-end lg:w-3/4 lg:flex-row lg:gap-20">
                <div>
                  <div className="z-1 bottom-0 flex w-full items-center gap-4 font-serif text-sm text-secondary lg:text-base">
                    {data.description}
                  </div>
                  <DialogClose asChild onClick={handleClose}>
                    <Link href={`/collections/${data.handle}`}>
                      <Button
                        variant="secondary"
                        className="mt-8 w-full gap-2 font-serif lg:mt-8 lg:w-1/2"
                      >
                        Buy Now
                      </Button>
                    </Link>
                  </DialogClose>
                </div>
              </div>
            </div>
          </div>
          <DialogClose onClick={handleClose}>
            <X className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 z-50 h-5 w-5 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
