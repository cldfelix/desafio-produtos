import { createProduct } from '@/lib/api';
import { useProductStore } from '@/store/productStore';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductForm from '../ProductForm';

// Mock do store
jest.mock('@/store/productStore');
jest.mock('@/lib/api');

const mockUseProductStore = useProductStore as jest.MockedFunction<
  typeof useProductStore
>;
const mockCreateProduct = createProduct as jest.MockedFunction<
  typeof createProduct
>;

// Mock window.location
delete (window as any).location;
window.location = { href: '' } as any;

describe('ProductForm', () => {
  const mockAddProduct = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    mockUseProductStore.mockImplementation((selector: any) => {
      const state = {
        addProduct: mockAddProduct,
        setError: mockSetError,
      };
      return selector(state);
    });
    mockAddProduct.mockClear();
    mockSetError.mockClear();
    mockCreateProduct.mockResolvedValue({
      id: 1,
      name: 'Test Product',
      category: 'Eletrônicos',
      price: 100,
      description: 'Test description',
      imageUrl: 'https://example.com/image.jpg',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar snapshot', () => {
    const { container } = render(<ProductForm />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('deve renderizar todos os campos do formulário', () => {
    render(<ProductForm />);

    expect(screen.getByLabelText(/Nome do Produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço \(R\$\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/URL da Imagem/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Cadastrar Produto/i })
    ).toBeInTheDocument();
  });

  it('deve atualizar campos ao digitar', () => {
    render(<ProductForm />);

    const nameInput = screen.getByLabelText(/Nome do Produto/i);
    fireEvent.change(nameInput, { target: { value: 'Novo Produto' } });

    expect(nameInput).toHaveValue('Novo Produto');
  });

  it('deve exibir erro ao tentar submeter formulário vazio', async () => {
    render(<ProductForm />);

    const submitButton = screen.getByRole('button', {
      name: /Cadastrar Produto/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(
        'Por favor, preencha todos os campos'
      );
    });
  });

  it('deve submeter formulário com dados válidos', async () => {
    render(<ProductForm />);

    fireEvent.change(screen.getByLabelText(/Nome do Produto/i), {
      target: { value: 'Novo Produto' },
    });
    fireEvent.change(screen.getByLabelText(/Preço \(R\$\)/i), {
      target: { value: '99.99' },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: 'Descrição do produto' },
    });
    fireEvent.change(screen.getByLabelText(/URL da Imagem/i), {
      target: { value: 'https://example.com/image.jpg' },
    });

    const submitButton = screen.getByRole('button', {
      name: /Cadastrar Produto/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalledWith({
        name: 'Novo Produto',
        category: 'Eletrônicos',
        price: 99.99,
        description: 'Descrição do produto',
        imageUrl: 'https://example.com/image.jpg',
      });
    });
  });

  it('deve exibir estado de loading durante submissão', async () => {
    mockCreateProduct.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<ProductForm />);

    fireEvent.change(screen.getByLabelText(/Nome do Produto/i), {
      target: { value: 'Novo Produto' },
    });
    fireEvent.change(screen.getByLabelText(/Preço \(R\$\)/i), {
      target: { value: '99.99' },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: 'Descrição' },
    });
    fireEvent.change(screen.getByLabelText(/URL da Imagem/i), {
      target: { value: 'https://example.com/image.jpg' },
    });

    const submitButton = screen.getByRole('button', {
      name: /Cadastrar Produto/i,
    });
    fireEvent.click(submitButton);

    expect(screen.getByText('Cadastrando...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('deve limpar formulário após submissão bem-sucedida', async () => {
    render(<ProductForm />);

    fireEvent.change(screen.getByLabelText(/Nome do Produto/i), {
      target: { value: 'Novo Produto' },
    });
    fireEvent.change(screen.getByLabelText(/Preço \(R\$\)/i), {
      target: { value: '99.99' },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: 'Descrição' },
    });
    fireEvent.change(screen.getByLabelText(/URL da Imagem/i), {
      target: { value: 'https://example.com/image.jpg' },
    });

    const submitButton = screen.getByRole('button', {
      name: /Cadastrar Produto/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/Nome do Produto/i)).toHaveValue('');
    });
  });

  it('deve exibir erro ao falhar criação do produto', async () => {
    mockCreateProduct.mockRejectedValue(new Error('Erro na API'));

    render(<ProductForm />);

    fireEvent.change(screen.getByLabelText(/Nome do Produto/i), {
      target: { value: 'Novo Produto' },
    });
    fireEvent.change(screen.getByLabelText(/Preço \(R\$\)/i), {
      target: { value: '99.99' },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: 'Descrição' },
    });
    fireEvent.change(screen.getByLabelText(/URL da Imagem/i), {
      target: { value: 'https://example.com/image.jpg' },
    });

    const submitButton = screen.getByRole('button', {
      name: /Cadastrar Produto/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Erro ao cadastrar produto');
    });
  });
});
