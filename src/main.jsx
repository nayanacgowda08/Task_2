import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { Router } from 'react-router-dom'
// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CartProvider>

    <App />
    </CartProvider>


  </StrictMode>,
)
