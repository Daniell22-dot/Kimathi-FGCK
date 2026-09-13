import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { fetchGallery } from '../utils/api'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchGallery()
      .then(setImages)
      .catch(() => setImages([]))
  }, [])

  const filtered = filter === 'all' ? images : images.filter(img => img.category === filter)
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))]

  return (
    <div className="gallery">
      <h2>Our Photo Gallery 📸</h2>
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all' ? 'All Photos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {filtered.map(item => (
          <div key={item.id} className="gallery-item" data-category={item.category}>
            <a href={item.src} data-lightbox="church-gallery" data-title={item.caption || item.title}>
              <img src={item.src} alt={item.caption || item.title} loading="lazy" />
              <div className="gallery-caption">
                <h3>{item.title || ''}</h3>
                <p>{item.caption || ''}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
