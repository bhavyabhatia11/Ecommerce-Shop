import { getMetaObjects } from 'lib/shopify';
import { Section } from 'lib/shopify/types';
import { About } from './about';
import { BestSellers } from './best-sellers';
import { Hero } from './hero';
import { NewArrivals } from './new-arrivals';
import { PopUp } from './pop-up';
import { Showcase } from './showcase';

export const LandingPage = async () => {
  const sections = await getMetaObjects('home_page');

  if (!sections) return null;

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return <Hero data={section} key={section.type} />;
      case 'about':
        return <About data={section} key={section.type} />;
      case 'best_sellers':
        return <BestSellers data={section} key={section.type} />;
      case 'new_arrivals':
        return <NewArrivals data={section} key={section.type} />;
      case 'showcase':
        return <Showcase data={section} key={section.type} />;
      case 'pop_up':
        return <PopUp data={section} key={section.type} />;
      default:
        return null;
    }
  };

  // Sort sections based on priority
  sections.sort((a: Section, b: Section) => parseInt(a.priority) - parseInt(b.priority));

  return (
    <div className="flex flex-col">
      {sections.map((section: Section) => renderSection(section))}
    </div>
  );
};
