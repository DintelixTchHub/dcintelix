import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store, { dispatch } from './store'
import { checkAuth } from './store/authSlice'
import './index.css'
import App from './App.jsx'

// Check authentication on app load
dispatch(checkAuth());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
