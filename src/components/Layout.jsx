import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BibleVerse from './BibleVerse'
import '../styles/global.css'

export default function Layout() {
  return (
    <div className="app">
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BibleVerse />
    </div>
  )
}
