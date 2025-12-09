import { useProductStore } from '@/store/productStore';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductFilters from '../ProductFilters';

// Mock do store
jest.mock('@/store/productStore');

const mockUseProductStore = useProductStore as jest.MockedFunction<
  typeof useProductStore
>;

describe('ProductFilters', () => {
  const mockSetFilterState = jest.fn();
  const mockSetSortOption = jest.fn();

  beforeEach(() => {
    mockUseProductStore.mockImplementation((selector: any) => {
      const state = {
        filterState: {
          name: '',
          minPrice: '',
          maxPrice: '',
        },
        sortOption: 'name-asc' as const,
        setFilterState: mockSetFilterState,
        setSortOption: mockSetSortOption,
      };
      return selector(state);
    });
    mockSetFilterState.mockClear();
    mockSetSortOption.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar snapshot', () => {
    const { container } = render(<ProductFilters />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('deve renderizar todos os campos de filtro', () => {
    render(<ProductFilters />);

    expect(screen.getByLabelText('Buscar por Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Preço Mínimo (R$)')).toBeInTheDocument();
    expect(screen.getByLabelText('Preço Máximo (R$)')).toBeInTheDocument();
    expect(screen.getByLabelText('Ordenar por')).toBeInTheDocument();
  });

  it('deve atualizar filtro de nome ao digitar', () => {
    render(<ProductFilters />);

    const nameInput = screen.getByLabelText('Buscar por Nome');
    fireEvent.change(nameInput, { target: { value: 'Notebook' } });

    expect(mockSetFilterState).toHaveBeenCalledWith({ name: 'Notebook' });
  });

  it('deve atualizar filtro de preço mínimo', () => {
    render(<ProductFilters />);

    const minPriceInput = screen.getByLabelText('Preço Mínimo (R$)');
    fireEvent.change(minPriceInput, { target: { value: '100' } });

    expect(mockSetFilterState).toHaveBeenCalledWith({ minPrice: 100 });
  });

  it('deve atualizar filtro de preço máximo', () => {
    render(<ProductFilters />);

    const maxPriceInput = screen.getByLabelText('Preço Máximo (R$)');
    fireEvent.change(maxPriceInput, { target: { value: '500' } });

    expect(mockSetFilterState).toHaveBeenCalledWith({ maxPrice: 500 });
  });

  it('deve atualizar ordenação ao selecionar opção', () => {
    render(<ProductFilters />);

    const sortSelect = screen.getByLabelText('Ordenar por');
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });

    expect(mockSetSortOption).toHaveBeenCalledWith('price-desc');
  });

  it('deve exibir botão limpar filtros quando há filtros ativos', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      const state = {
        filterState: {
          name: 'Notebook',
          minPrice: 100,
          maxPrice: '',
        },
        sortOption: 'name-asc' as const,
        setFilterState: mockSetFilterState,
        setSortOption: mockSetSortOption,
      };
      return selector(state);
    });

    render(<ProductFilters />);

    expect(screen.getByText('Limpar Filtros')).toBeInTheDocument();
  });

  it('não deve exibir botão limpar filtros quando não há filtros ativos', () => {
    render(<ProductFilters />);

    expect(screen.queryByText('Limpar Filtros')).not.toBeInTheDocument();
  });

  it('deve limpar filtros ao clicar no botão', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      const state = {
        filterState: {
          name: 'Notebook',
          minPrice: 100,
          maxPrice: 500,
        },
        sortOption: 'name-asc' as const,
        setFilterState: mockSetFilterState,
        setSortOption: mockSetSortOption,
      };
      return selector(state);
    });

    render(<ProductFilters />);

    const clearButton = screen.getByText('Limpar Filtros');
    fireEvent.click(clearButton);

    expect(mockSetFilterState).toHaveBeenCalledWith({
      name: '',
      minPrice: '',
      maxPrice: '',
    });
  });
});
