import { render } from 'preact'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const rootElement = document.querySelector<HTMLDivElement>('#root')

if (!rootElement) {
  throw new Error('Missing root element!')
}

const loaderElement =
  rootElement.querySelector<HTMLDivElement>('#initial-loader')

if (!loaderElement) {
  throw new Error('Missing loader element!')
}

rootElement.removeChild(loaderElement)

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  rootElement,
)
