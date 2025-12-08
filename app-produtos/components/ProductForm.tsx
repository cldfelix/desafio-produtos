'use client';

import { createProduct } from '@/lib/api';
import { useProductStore } from '@/store/productStore';
import { FormEvent, useState } from 'react';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Eletrônicos');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProduct = useProductStore(state => state.addProduct);
  const setError = useProductStore(state => state.setError);

  const categories = ['Eletrônicos', 'Móveis', 'Roupas', 'Livros', 'Outros'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description || !imageUrl) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newProduct = {
        name,
        category,
        price: parseFloat(price),
        description,
        imageUrl,
      };

      // Simular chamada à API
      await createProduct(newProduct);

      // Adicionar ao store
      addProduct(newProduct);

      // Limpar formulário
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      setCategory('Eletrônicos');

      // Redirecionar para a lista de produtos após cadastro bem-sucedido
      if (typeof window !== 'undefined') {
        window.location.href = '/products';
      }
    } catch (error) {
      setError('Erro ao cadastrar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Produto *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoria *
            </label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preço (R$) *
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              URL da Imagem *
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  );
}
