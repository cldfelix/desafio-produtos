'use client';

import { useProductStore } from '@/store/productStore';
import { SortOption } from '@/types/product';

export default function ProductFilters() {
  const filterState = useProductStore(state => state.filterState);
  const sortOption = useProductStore(state => state.sortOption);
  const setFilterState = useProductStore(state => state.setFilterState);
  const setSortOption = useProductStore(state => state.setSortOption);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name-asc', label: 'Nome (A-Z)' },
    { value: 'name-desc', label: 'Nome (Z-A)' },
    { value: 'price-asc', label: 'Preço (Menor-Maior)' },
    { value: 'price-desc', label: 'Preço (Maior-Menor)' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Filtros e Ordenação
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro por Nome */}
        <div>
          <label
            htmlFor="filter-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Buscar por Nome
          </label>
          <input
            type="text"
            id="filter-name"
            value={filterState.name}
            onChange={e => setFilterState({ name: e.target.value })}
            placeholder="Digite o nome..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por Preço Mínimo */}
        <div>
          <label
            htmlFor="filter-min-price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço Mínimo (R$)
          </label>
          <input
            type="number"
            id="filter-min-price"
            value={filterState.minPrice}
            onChange={e =>
              setFilterState({
                minPrice: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por Preço Máximo */}
        <div>
          <label
            htmlFor="filter-max-price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço Máximo (R$)
          </label>
          <input
            type="number"
            id="filter-max-price"
            value={filterState.maxPrice}
            onChange={e =>
              setFilterState({
                maxPrice: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            placeholder="9999.99"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Ordenação */}
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ordenar por
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={e => setSortOption(e.target.value as SortOption)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botão para limpar filtros */}
      {(filterState.name ||
        filterState.minPrice !== '' ||
        filterState.maxPrice !== '') && (
        <div className="mt-4">
          <button
            onClick={() =>
              setFilterState({ name: '', minPrice: '', maxPrice: '' })
            }
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
}
