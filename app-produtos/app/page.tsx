'use client';

import { fetchProducts } from '@/lib/api';
import { useProductStore } from '@/store/productStore';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const setProducts = useProductStore(state => state.setProducts);
  const setLoading = useProductStore(state => state.setLoading);
  const setError = useProductStore(state => state.setError);
  const products = useProductStore(state => state.products);
  const filteredProducts = useProductStore(state => state.filteredProducts);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError(
          'Erro ao carregar produtos. Verifique se o MSW está configurado.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [setProducts, setLoading, setError]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Visão geral do sistema de gerenciamento de produtos
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total de Produtos
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {products.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Produtos Filtrados
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {filteredProducts.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ações Rápidas
            </h3>
            <div className="mt-4 space-y-2">
              <Link
                href="/produtos/novo"
                className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
              >
                Cadastrar Produto
              </Link>
              <Link
                href="/produtos"
                className="block w-full px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-md hover:bg-gray-300 transition-colors"
              >
                Ver Todos os Produtos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
