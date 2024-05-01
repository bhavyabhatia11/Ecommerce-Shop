import { ShoppingCart } from 'lucide-react';

export default function OpenCart({ quantity = 0 }: { className?: string; quantity?: number }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center transition-colors">
      <div className="hidden lg:block">Cart({quantity})</div>
      <div className="relative block lg:hidden ">
        <ShoppingCart className="m-0 h-4 w-4 p-0" />
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-3 w-3 rounded-full bg-primary font-serif text-[9px] text-black">
          {quantity}
        </div>
      </div>
    </div>
  );
}
