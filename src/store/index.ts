import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Cart, Product } from '@/models';
import { countObjectKeys, hasKeyInObject } from '@/utils';
import { ONE, TW0, ZERO } from '@/constants';

const STORE_NAME = 'cart-store' as const;
const STORE_ACTIONS_NAMES = {
  addProductToCart: 'add-product-to-cart',
  removeProductFromCart: 'remove-product-from-cart',
} as const;

interface CartStoreState {
  items: Cart;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
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

        state.items[product.id] = {
          product,
          quantity: ONE,
        };
      },
      false,
      STORE_ACTIONS_NAMES.addProductToCart
    );
  },
  removeProductFromCart(productId) {
    set(
      (state) => {
        delete state.items[productId];
      },
      false,
      STORE_ACTIONS_NAMES.removeProductFromCart
    );
  },
});

export const useCartStore = create<CartStoreState>()(devtools(immer(store), { name: STORE_NAME }));

/** Selectors */
export const cartItemsSelector = (state: CartStoreState) => state.items;
export const addProductToCartSelector = (state: CartStoreState) => state.addProductToCart;
export const cartItemsLengthSelector = (state: CartStoreState) => countObjectKeys(state.items);
export const getTotalPriceSelector = (state: CartStoreState) =>
  Object.keys(state.items)
    .reduce((accumulator, currentKey) => {
      const {
        product: { price },
        quantity,
      } = state.items[currentKey];
      return accumulator + price * quantity;
    }, Number(ZERO))
    .toFixed(TW0);
