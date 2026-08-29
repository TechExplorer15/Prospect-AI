import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Tool from './pages/Tool'
import History from './pages/History'
import About from './pages/About'

function App() {
  const location = useLocation()
  const showNavbar = location.pathname !== '/'

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tool" element={<Tool />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
