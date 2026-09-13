import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header>
      <h1>Full Gospel Churches of Kenya, Nyeri Town LCA Kimathi Branch</h1>
      <nav>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
          ☰
        </button>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/departments">Departments</Link></li>
          <li><Link to="/leadership">Leadership</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/join">Why Join Us?</Link></li>
          <li><Link to="/directions">Directions & Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}
