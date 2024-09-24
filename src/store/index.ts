import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Cart, Product } from '@/models';
import { countObjectKeys, hasKeyInObject } from '@/utils';
import { ONE, TW0, ZERO } from '@/constants';

const STORE_NAME = 'cart-store' as const;
const STORE_ACTIONS_NAMES = {
  addProductToCart: 'add-product-to-cart',
  addProductToCartWithQuantity: 'add-product-to-cart-with-quantity',
  removeProductFromCart: 'remove-product-from-cart',
  updateProductQuantity: 'update-product-quantity',
} as const;

interface CartStoreState {
  items: Cart;
  addProductToCart: (product: Product) => void;
  addProductToCartWithQuantity: (product: Product, quantity: number) => void;
  removeProductFromCart: (productId: number) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
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
  addProductToCartWithQuantity(product, quantity) {
    set(
      (state) => {
        if (hasKeyInObject(state.items, String(product.id))) {
          state.items[product.id].quantity += quantity;
          return;
        }

        state.items[product.id] = {
          product,
          quantity,
        };
      },
      false,
      STORE_ACTIONS_NAMES.addProductToCartWithQuantity
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
  updateProductQuantity(productId, quantity) {
    set(
      (state) => {
        state.items[productId].quantity = quantity;
      },
      false,
      STORE_ACTIONS_NAMES.updateProductQuantity
    );
  },
});

export const useCartStore = create<CartStoreState>()(devtools(immer(store), { name: STORE_NAME }));

/** Selectors */
export const cartItemsSelector = (state: CartStoreState) => state.items;
export const addProductToCartSelector = (state: CartStoreState) => state.addProductToCart;
export const addProductToCartWithQuantitySelector = (state: CartStoreState) => state.addProductToCartWithQuantity;
export const removeProductFromCartSelector = (state: CartStoreState) => state.removeProductFromCart;
export const updateProductQuantitySelector = (state: CartStoreState) => state.updateProductQuantity;
export const cartItemsLengthSelector = (state: CartStoreState) => countObjectKeys(state.items);
export const totalPriceSelector = (state: CartStoreState) =>
  Object.keys(state.items)
    .reduce((accumulator, currentKey) => {
      const {
        product: { price },
        quantity,
      } = state.items[currentKey];
      return accumulator + price * quantity;
    }, Number(ZERO))
    .toFixed(TW0);
