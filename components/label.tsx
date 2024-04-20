import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode
}: {
  title: string;
  amount?: string;
  currencyCode?: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div className="py:4 font-serif">
      <div className="items-left flex flex-col text-xs ">
        <h3 className="mr-4 line-clamp-2 flex-grow ">{title}</h3>
        {amount && currencyCode && (
          <Price
            className="flex-none "
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        )}
      </div>
    </div>
  );
};

export default Label;
