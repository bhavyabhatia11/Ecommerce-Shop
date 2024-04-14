import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx('flex flex-none items-center justify-center', {
        'h-[70px] w-[196px] rounded-xl': !size,
        'h-[35px] w-[98px] rounded-lg': size === 'sm'
      })}
    >
      <LogoIcon
        className={clsx({
          'h-[49px] w-[156px]': !size,
          'h-[35px] w-[98pxx]': size === 'sm'
        })}
      />
    </div>
  );
}
