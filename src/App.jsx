import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import CelebrationPage from './pages/CelebrationPage'
import NotFoundPage from './pages/NotFoundPage'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState('romantic')

  // Available themes
  const themes = [
    { id: 'romantic', name: 'रोमांटिक' },
    { id: 'festive', name: 'उत्सव' },
    { id: 'elegant', name: 'सुरुचिपूर्ण' }
  ]

  // Apply theme to body
  useEffect(() => {
    document.body.className = `theme-${theme}`
    return () => {
      document.body.className = ''
    }
  }, [theme])

  return (
    <Router>
      <div className="app-container">
        <Header themes={themes} currentTheme={theme} onThemeChange={setTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/celebration/:id" element={<CelebrationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
