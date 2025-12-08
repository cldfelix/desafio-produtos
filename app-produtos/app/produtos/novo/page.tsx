'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/produtos"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Voltar para Lista
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Cadastrar Novo Produto
          </h1>
          <p className="text-gray-600">
            Preencha os dados abaixo para cadastrar um novo produto
          </p>
        </header>

        <ProductForm />
      </div>
    </div>
  );
}

