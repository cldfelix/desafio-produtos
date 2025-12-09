import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('deve renderizar snapshot com múltiplas páginas', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('deve renderizar snapshot na página do meio', () => {
    const { container } = render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('não deve renderizar quando há apenas 1 página', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('deve renderizar botões de navegação', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Próxima página')).toBeInTheDocument();
  });

  it('deve desabilitar botão anterior na primeira página', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText('Página anterior');
    expect(prevButton).toBeDisabled();
  });

  it('deve desabilitar botão próxima na última página', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText('Próxima página');
    expect(nextButton).toBeDisabled();
  });

  it('deve chamar onPageChange ao clicar em próxima página', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText('Próxima página');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('deve chamar onPageChange ao clicar em página anterior', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText('Página anterior');
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('deve chamar onPageChange ao clicar em número de página', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByLabelText('Ir para página 4');
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('deve destacar página atual', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const currentPageButton = screen.getByLabelText('Ir para página 3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('deve exibir ellipsis quando há muitas páginas', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
