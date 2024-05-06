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
    <div className="pb-4 pt-1 font-serif tracking-normal lg:pb-0 lg:pt-3 lg:tracking-wider">
      <div className="items-left flex flex-col gap-1 text-xs">
        <h3 className="line-clamp-2 flex-grow text-xs lg:text-base">{title}</h3>
        {amount && currencyCode && (
          <Price
            className="flex-none text-xs text-neutral-500 lg:text-base"
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
