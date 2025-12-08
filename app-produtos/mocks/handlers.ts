import { http, HttpResponse } from 'msw';
import { Product } from '@/types/product';

// Dados mock iniciais
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Notebook Dell Inspiron',
    category: 'Eletrônicos',
    price: 3299.99,
    description: 'Notebook com processador Intel i5, 8GB RAM, 256GB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
  },
  {
    id: 2,
    name: 'Smartphone Samsung Galaxy',
    category: 'Eletrônicos',
    price: 1899.99,
    description: 'Smartphone Android com tela de 6.5 polegadas, 128GB de armazenamento',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
  },
  {
    id: 3,
    name: 'Mesa de Escritório',
    category: 'Móveis',
    price: 599.99,
    description: 'Mesa de escritório em madeira maciça, 120x60cm',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
  },
  {
    id: 4,
    name: 'Cadeira Ergonômica',
    category: 'Móveis',
    price: 899.99,
    description: 'Cadeira ergonômica com ajuste de altura e apoio lombar',
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
  },
  {
    id: 5,
    name: 'Fone de Ouvido Bluetooth',
    category: 'Eletrônicos',
    price: 299.99,
    description: 'Fone de ouvido sem fio com cancelamento de ruído',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  },
];

let products = [...initialProducts];
let nextId = 6;

export const handlers = [
  // GET /api/products - Listar produtos
  http.get('/api/products', () => {
    return HttpResponse.json(products);
  }),

  // POST /api/products - Criar produto
  http.post('/api/products', async ({ request }) => {
    const newProduct = await request.json() as Omit<Product, 'id'>;
    const product: Product = {
      ...newProduct,
      id: nextId++,
    };
    products.push(product);
    return HttpResponse.json(product, { status: 201 });
  }),
];

