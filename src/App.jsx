import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Departments from './pages/Departments'
import Leadership from './pages/Leadership'
import Gallery from './pages/Gallery'
import Directions from './pages/Directions'
import Join from './pages/Join'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/directions" element={<Directions />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Layout>
  )
}
