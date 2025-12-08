import { Product } from '@/types/product';

const API_BASE_URL = '/api/products';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  return response.json();
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar produto');
  }
  return response.json();
}

