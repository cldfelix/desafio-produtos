import { useProductStore } from '@/store/productStore';
import { Product } from '@/types/product';
import { render, screen } from '@testing-library/react';
import ProductList from '../ProductList';

// Mock do store
jest.mock('@/store/productStore');

const mockUseProductStore = useProductStore as jest.MockedFunction<
  typeof useProductStore
>;

describe('ProductList', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Notebook Dell',
      category: 'Eletrônicos',
      price: 3299.99,
      description: 'Notebook com processador Intel i5',
      imageUrl: 'https://example.com/notebook.jpg',
    },
    {
      id: 2,
      name: 'Smartphone Samsung',
      category: 'Eletrônicos',
      price: 1899.99,
      description: 'Smartphone Android',
      imageUrl: 'https://example.com/phone.jpg',
    },
  ];

  beforeEach(() => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: false });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar snapshot quando há produtos', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: false });
    });
    const { container } = render(<ProductList products={mockProducts} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('deve renderizar snapshot quando está carregando', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: true });
    });
    const { container } = render(<ProductList products={[]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('deve renderizar snapshot quando não há produtos', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: false });
    });
    const { container } = render(<ProductList products={[]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('deve exibir mensagem de carregamento quando isLoading é true', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: true });
    });
    render(<ProductList products={[]} />);
    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument();
  });

  it('deve exibir mensagem quando não há produtos', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: false });
    });
    render(<ProductList products={[]} />);
    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument();
  });

  it('deve renderizar lista de produtos corretamente', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: false });
    });
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText('Notebook Dell')).toBeInTheDocument();
    expect(screen.getByText('Smartphone Samsung')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
  });

  it('deve exibir preços formatados corretamente', () => {
    mockUseProductStore.mockImplementation((selector: any) => {
      return selector({ isLoading: false });
    });
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText('R$ 3299,99')).toBeInTheDocument();
    expect(screen.getByText('R$ 1899,99')).toBeInTheDocument();
  });
});
