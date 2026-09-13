import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Departments from './pages/Departments'
import DepartmentPage from './pages/DepartmentPage'
import Leadership from './pages/Leadership'
import Gallery from './pages/Gallery'
import Directions from './pages/Directions'
import Join from './pages/Join'
import Videos from './pages/Videos'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="departments" element={<Departments />} />
        <Route path="departments/:slug" element={<DepartmentPage />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="directions" element={<Directions />} />
        <Route path="join" element={<Join />} />
        <Route path="videos" element={<Videos />} />
      </Route>
    </Routes>
  )
}
