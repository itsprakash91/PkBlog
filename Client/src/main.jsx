import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastWrapper } from '@/components/ToastWrapper'
import { Provider } from 'react-redux'
import { persister, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@/context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={<div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>} persistor={persister}>
          <ToastWrapper />
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
