import { FilterState, Product, SortOption } from '@/types/product';
import { create } from 'zustand';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  filterState: FilterState;
  sortOption: SortOption;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  setFilterState: (filters: Partial<FilterState>) => void;
  setSortOption: (option: SortOption) => void;
  applyFiltersAndSort: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  filterState: {
    name: '',
    minPrice: '',
    maxPrice: '',
  },
  sortOption: 'name-asc',
  isLoading: false,
  error: null,

  setProducts: products => {
    set({ products });
    get().applyFiltersAndSort();
  },

  addProduct: productData => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(), // ID temporário baseado em timestamp
    };
    set(state => ({
      products: [...state.products, newProduct],
    }));
    get().applyFiltersAndSort();
  },

  setFilterState: filters => {
    set(state => ({
      filterState: { ...state.filterState, ...filters },
    }));
    get().applyFiltersAndSort();
  },

  setSortOption: option => {
    set({ sortOption: option });
    get().applyFiltersAndSort();
  },

  applyFiltersAndSort: () => {
    const { products, filterState, sortOption } = get();

    let filtered = [...products];

    // Aplicar filtro por nome
    if (filterState.name) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filterState.name.toLowerCase())
      );
    }

    // Aplicar filtro por preço mínimo
    if (filterState.minPrice !== '') {
      filtered = filtered.filter(
        product => product.price >= Number(filterState.minPrice)
      );
    }

    // Aplicar filtro por preço máximo
    if (filterState.maxPrice !== '') {
      filtered = filtered.filter(
        product => product.price <= Number(filterState.maxPrice)
      );
    }

    // Aplicar ordenação
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    set({ filteredProducts: filtered });
  },

  setLoading: loading => set({ isLoading: loading }),
  setError: error => set({ error }),
}));
