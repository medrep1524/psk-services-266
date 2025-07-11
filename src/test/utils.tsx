import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Configuration QueryClient pour les tests
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
    mutations: {
      retry: false,
    },
  },
})

// Wrapper personnalisé avec tous les providers nécessaires
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient()
  
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  )
}

// Custom render function avec les providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Mock user pour les tests d'authentification
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  role: 'juriste' as const,
  name: 'Test User'
}

// Mock handlers pour les tests d'API
export const mockApiHandlers = {
  success: (data: any) => Promise.resolve({ data }),
  error: (error: string) => Promise.reject(new Error(error)),
  loading: () => new Promise(() => {}), // Never resolves
}

// Helpers pour tester les hooks
export { act } from '@testing-library/react'
export { renderHook } from '@testing-library/react'

// Re-export everything
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// Override render method
export { customRender as render }