import { ShoppingBasket } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore, cartItemsLengthSelector, totalPriceSelector } from '@/store';

import CartList from './CartList';

function CartSheet() {
  const cartItemsLength = useCartStore(cartItemsLengthSelector);
  const totalPrice = useCartStore(totalPriceSelector);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <ShoppingBasket size={34} />
          <Badge variant="default" className="absolute top-1/3 right-1/2 rounded-full w-6 h-6 p-[0.4rem]">
            {cartItemsLength}
          </Badge>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between p-2">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </SheetDescription>
        </SheetHeader>
        <CartList />
        <span className="self-end">Total price: ${totalPrice}</span>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full" onClick={() => alert('checkout')}>
              Proceed to checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;
