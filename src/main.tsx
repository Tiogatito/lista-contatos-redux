import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import App from './App'
import { store } from './store'
import { GlobalStyle, tema } from './styles'

createRoot(document.getElementById('root')!).render(<StrictMode><Provider store={store}><ThemeProvider theme={tema}><GlobalStyle /><App /></ThemeProvider></Provider></StrictMode>)
