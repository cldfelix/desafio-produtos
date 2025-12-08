'use client';

import { useEffect, useState } from 'react';

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function initMSW() {
      if (typeof window !== 'undefined') {
        try {
          const { worker } = await import('@/mocks/browser');
          await worker.start({
            onUnhandledRequest: 'bypass',
          });
          setMswReady(true);
        } catch (error) {
          console.error('Erro ao inicializar MSW:', error);
          // Continuar mesmo se o MSW falhar
          setMswReady(true);
        }
      } else {
        // No servidor, não precisa do MSW
        setMswReady(true);
      }
    }

    initMSW();
  }, []);

  if (!mswReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  return <>{children}</>;
}
