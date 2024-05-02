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
    <div className="py-4 font-serif tracking-widest">
      <div className="items-left flex flex-col text-xs">
        <h3 className="line-clamp-2 flex-grow text-base">{title}</h3>
        {amount && currencyCode && (
          <Price
            className="flex-none text-base text-neutral-500"
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
