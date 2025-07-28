import { formatAsCurrency } from "@/shared/utils/numbers/formatAsCurrency";

interface IProps {
  price: number;
}

export const Price = ({ price }: IProps) => {
  if (price === undefined || price === null) return null;

  return (
    <span className="bg-primary text-primary-foreground relative px-2 py-1 pr-6 text-lg font-semibold">
      {formatAsCurrency(price.toString())}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-full border-y-[18px] border-r-[18px] border-y-transparent border-r-black"
      />
    </span>
  );
};
