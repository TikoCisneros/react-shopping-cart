import { Product } from './products';

export interface Cart {
  [productId: string]: {
    product: Product;
    quantity: number;
  };
}
