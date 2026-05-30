import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },

    mutations: {
      onError: (error) => {
        console.log(error)
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}> 
    
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster/>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)