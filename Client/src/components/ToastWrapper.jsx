import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '@/context/ThemeContext'

export function ToastWrapper() {
  const { theme } = useTheme()
  return <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} position="top-right" />
}
