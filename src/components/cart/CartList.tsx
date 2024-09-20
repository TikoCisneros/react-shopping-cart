import { useCartStore, cartItemsSelector } from '@/store';

function CartList() {
  const cart = useCartStore(cartItemsSelector);

  return <span>{JSON.stringify(cart)}</span>;
}

export default CartList;
