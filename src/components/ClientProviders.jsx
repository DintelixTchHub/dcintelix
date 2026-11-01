'use client'

import { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { makeStore } from '../store'
import { checkAuth } from '../store/authSlice'
import { ThemeProvider } from '../contexts/ThemeContext'

function AuthBootstrap() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return null
}

export default function ClientProviders({ children }) {
  const [store] = useState(makeStore)

  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        <AuthBootstrap />
      </ThemeProvider>
    </Provider>
  )
}
