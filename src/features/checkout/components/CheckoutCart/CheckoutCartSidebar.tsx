import { CircleXIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { formatAsCurrency } from "@/shared/utils/numbers/formatAsCurrency";

interface IProps {
  isCanceled?: boolean;
  onCheckout?: () => void;
  totalPrice: string;
}

export const CheckoutCartSidebar = ({
  isCanceled,
  onCheckout,
  totalPrice,
}: IProps) => {
  return (
    <aside className="flex flex-col gap-6">
      <div className="bg-background rounded-md border">
        <section className="flex items-center justify-between rounded-t-md border-b p-4">
          <h4 className="text-lg font-medium">Total</h4>
          <span className="text-lg font-medium">
            {formatAsCurrency(totalPrice)}
          </span>
        </section>

        <section className="p-4">
          <Button className="w-full" onClick={onCheckout} variant="reverse">
            Checkout
          </Button>
        </section>
      </div>

      {!isCanceled && (
        <section className="bg-background rounded-md border p-4">
          <div className="flex items-center justify-center">
            <div className="w-full rounded border border-red-400 bg-red-100 px-4 py-3 font-medium">
              <div className="flex items-center">
                <CircleXIcon className="mr-2 size-6 fill-red-500 text-red-100" />
                <span className="text-primary-foreground">
                  Checkout failed. Please, try again
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </aside>
  );
};
