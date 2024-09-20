import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Cart, Product } from '@/models';
import { countObjectKeys, hasKeyInObject } from '@/utils';
import { ONE } from '@/constants';

const STORE_NAME = 'cart-store' as const;
const STORE_ACTIONS_NAMES = {
  addProductToCart: 'add-product-to-cart',
} as const;

interface CartStoreState {
  items: Cart;
  addProductToCart: (product: Product) => void;
}

const store: StateCreator<CartStoreState, [['zustand/devtools', never], ['zustand/immer', never]]> = (set) => ({
  items: {},
  addProductToCart(product) {
    set(
      (state) => {
        if (hasKeyInObject(state.items, String(product.id))) {
          state.items[product.id].quantity++;
          return;
        }

        state.items = {
          ...state.items,
          [product.id]: {
            product,
            quantity: ONE,
          },
        };
      },
      false,
      STORE_ACTIONS_NAMES.addProductToCart
    );
  },
});

export const useCartStore = create<CartStoreState>()(devtools(immer(store), { name: STORE_NAME }));

/** Selectors */
export const cartItemsSelector = (state: CartStoreState) => state.items;
export const addProductToCartSelector = (state: CartStoreState) => state.addProductToCart;
export const cartItemsLengthSelector = (state: CartStoreState) => countObjectKeys(state.items);
