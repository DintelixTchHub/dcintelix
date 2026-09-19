import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, createContext, useContext } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import StickyWhatsApp from './components/StickyWhatsApp'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Testimonials from './pages/Testimonials'
import Careers from './pages/Careers'
import CareerDetails from './pages/CareerDetails'
import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import AdminDashboard from './pages/AdminDashboard'
import AdminJobPosting from './pages/AdminJobPosting'
import AdminTrainingPosting from './pages/AdminTrainingPosting'
import AdminInternshipPosting from './pages/AdminInternshipPosting'
import AdminJobEdit from './pages/AdminJobEdit'
import AdminLayout, { AdminIndexRedirect } from './components/AdminLayout'
import './index.css'

// Theme Context
const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function AppShell() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes - must come before wildcard */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<CareerDetails />} />

          {/* Admin routes use their own layout and never render public chrome. */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminIndexRedirect />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="register" element={<AdminRegister />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="jobs/new" element={<AdminJobPosting />} />
            <Route path="training/new" element={<AdminTrainingPosting />} />
            <Route path="internships/new" element={<AdminInternshipPosting />} />
            <Route path="jobs/:id/edit" element={<AdminJobEdit />} />
          </Route>

          {/* Catch-all for undefined routes - must be last */}
          <Route path="/*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CookieConsent />}
      {!isAdminRoute && <StickyWhatsApp />}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('dcintelix-theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('dcintelix-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <ScrollToTop />
        <AppShell />
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
