import { Product } from './products';

export interface Cart {
  [productId: number]: {
    product: Product;
    quantity: number;
  };
}
