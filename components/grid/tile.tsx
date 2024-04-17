/* eslint-disable jsx-a11y/alt-text */
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
    <div className={clsx('group flex h-full w-full items-center justify-center overflow-hidden')}>
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          width={1}
          height={1}
          {...props}
        />
      ) : null}
    </div>
  );
}
