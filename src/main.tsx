import { render } from 'preact'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Editor from './components/Editor'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

render(
  <QueryClientProvider client={queryClient}>
    <div>
      <Editor>
        <App />
      </Editor>
    </div>
  </QueryClientProvider>,
  document.getElementById('root') as HTMLElement,
)
