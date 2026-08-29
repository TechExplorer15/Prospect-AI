import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/tool" className="navbar-logo">
        <div className="logo-icon">⚡</div>
        Prospect AI
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/tool" className={({ isActive }) => isActive ? 'active' : ''}>
          Tool
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
          History
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
          About
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
