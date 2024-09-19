import { Product } from './products';

export interface FetchProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type FetchProductById = Product;
