import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Cart, Product } from '@/models';
import { countObjectKeys, hasKeyInObject } from '@/utils';
import { ONE, ZERO } from '@/constants';

const STORE_NAME = 'cart-store' as const;
const STORE_ACTIONS_NAMES = {
  addProductToCart: 'add-product-to-cart',
} as const;

interface CartStoreState {
  items: Cart;
  itemsLength: number;
  addProductToCart: (product: Product) => void;
}

const store: StateCreator<CartStoreState, [['zustand/devtools', never], ['zustand/immer', never]]> = (set) => ({
  items: {},
  itemsLength: ZERO,
  addProductToCart(product) {
    set(
      (state) => {
        if (hasKeyInObject(state.items, product.id)) {
          state.items[product.id].quantity++;
          return;
        }

        const cartItems = {
          ...state.items,
          [product.id]: {
            product,
            quantity: ONE,
          },
        };

        state.items = cartItems;
        state.itemsLength = countObjectKeys(cartItems);
      },
      false,
      STORE_ACTIONS_NAMES.addProductToCart
    );
  },
});

export const useCartStore = create<CartStoreState>()(devtools(immer(store), { name: STORE_NAME }));
