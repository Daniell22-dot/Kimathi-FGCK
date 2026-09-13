import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import '../styles/global.css'

export default function Layout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
