'use client';

import Pagination from '@/components/Pagination';
import ProductFilters from '@/components/ProductFilters';
import ProductList from '@/components/ProductList';
import { fetchProducts } from '@/lib/api';
import { useProductStore } from '@/store/productStore';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 3;

export default function ProductsPage() {
  const setProducts = useProductStore(state => state.setProducts);
  const setLoading = useProductStore(state => state.setLoading);
  const setError = useProductStore(state => state.setError);
  const error = useProductStore(state => state.error);
  const filteredProducts = useProductStore(state => state.filteredProducts);
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular produtos paginados
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Calcular total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  }, [filteredProducts.length]);

  // Resetar para página 1 quando os filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const products = await fetchProducts();
        setProducts(products);
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
          <div className="flex justify-end">
            <Link
              href="/produtos/novo"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              + Novo Produto
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <ProductFilters />

        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProducts.length} produto(s) encontrado(s)
            {totalPages > 1 && (
              <span className="ml-2 text-gray-500">
                (Página {currentPage} de {totalPages})
              </span>
            )}
          </p>
        </div>

        <ProductList products={paginatedProducts} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
