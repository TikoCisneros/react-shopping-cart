import { useCartStore } from '@/store';

function CartList() {
  const cart = useCartStore((state) => state.items);

  return <span>{JSON.stringify(cart)}</span>;
}

export default CartList;
