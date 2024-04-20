import { getMetaObjects } from 'lib/shopify';

export const LandingPage = async () => {
  const metaObject = await getMetaObjects('testimonial');
  console.log(metaObject[0].fields, 'META OBJECT');
  return (
    <div>
      <h1>Welcome to our store!</h1>
    </div>
  );
};
