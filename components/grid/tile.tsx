import clsx from 'clsx';
import Image from 'next/image';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-[500px] w-[360px] items-center justify-center overflow-hidden bg-primary hover:bg-secondary'
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          objectFit="cover"
          {...props}
        />
      ) : null}
    </div>
  );
}
