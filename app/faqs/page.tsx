import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
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
import { notFound } from 'next/navigation';

export default async function FAQs() {
  const faqs = await getMetaObjects('faqs');

  if (!faqs) return notFound();

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

          <BreadcrumbItem>
            <BreadcrumbLink href={`/faqs`}>FAQs</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:py-8">
        <div className="py-2 pb-4 text-2xl lg:py-8 lg:text-6xl"> Something Confusing ? </div>
        <div className="flex flex-col gap-8 lg:mt-8 lg:gap-16">
          <Accordion type="single" collapsible>
            {faqs.map((faq: any, index: number) => {
              return (
                <AccordionItem className="p-0 transition-colors " key={index} value={faq.question}>
                  <AccordionTrigger className="font-serif text-base hover:no-underline lg:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="lg:pb-4">
                    <Prose
                      className="flex flex-col gap-4 font-serif text-sm tracking-wider text-neutral-500 lg:mx-0 lg:gap-8 lg:text-base"
                      html={toHTML(faq.ans) as string}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
