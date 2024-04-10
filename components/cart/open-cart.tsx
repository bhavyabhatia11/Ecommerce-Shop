export default function OpenCart({
  className,
  quantity = 0
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center transition-colors">
      Cart({quantity})
    </div>
  );
}
