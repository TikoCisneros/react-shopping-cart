import { useCartStore, cartItemsSelector } from '@/store';

function CartList() {
  const cart = useCartStore(cartItemsSelector);

  return <div className="flex flex-1 flex-col w-full overflow-y-auto">{JSON.stringify(cart)}</div>;
}

export default CartList;
