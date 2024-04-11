import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx('flex flex-none items-center justify-center', {
        'h-[70px] w-[400px] rounded-xl': !size,
        'h-[30px] w-[30px] rounded-lg': size === 'sm'
      })}
    >
      <LogoIcon
        className={clsx({
          'h-[150px] w-[200px]': !size,
          'h-[75px] w-[100px]': size === 'sm'
        })}
      />
    </div>
  );
}
