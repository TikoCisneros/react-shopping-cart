import { FetchProductById, FetchProducts } from '@/models';

const ERROR_MESSAGE = 'Network response was not OK' as const;

export async function fetchProducts(): Promise<FetchProducts> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
  return response.json();
}

export async function fetchProductById(id: string): Promise<FetchProductById> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
  return response.json();
}
