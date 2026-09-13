import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

const categories = ['All Photos', 'Worship Service', 'Church Events', 'Youth Ministry']

const photos = [
  { id: 1, src: 'images/gallery/worship1.jpg', category: 'Worship Service', caption: 'Sunday Worship' },
  { id: 2, src: 'images/gallery/event1.jpg', category: 'Church Events', caption: 'Community Outreach' },
  { id: 3, src: 'images/gallery/youth1.jpg', category: 'Youth Ministry', caption: 'Youth Fellowship' },
  { id: 4, src: 'images/gallery/worship2.jpg', category: 'Worship Service', caption: 'Choir Performance' },
  { id: 5, src: 'images/gallery/event2.jpg', category: 'Church Events', caption: 'Harvest Service' },
  { id: 6, src: 'images/gallery/youth2.jpg', category: 'Youth Ministry', caption: 'Youth Camp' }
]

export default function Gallery() {
  const [filter, setFilter] = useState('All Photos')
  const [lightboxReady, setLightboxReady] = useState(false)

  useEffect(() => {
    if (window.lightbox) {
      window.lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
        fadeDuration: 200,
        imageFadeDuration: 200
      })
      setLightboxReady(true)
    }
  }, [filter])

  const filtered = filter === 'All Photos' ? photos : photos.filter(p => p.category === filter)

  return (
    <div className="gallery-section">
      <h2>Gallery</h2>
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn${filter === cat ? ' active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {filtered.map(photo => (
          <div key={photo.id} className="gallery-item">
            <a href={photo.src} data-lightbox="church-gallery" data-title={photo.caption}>
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <div className="gallery-caption">
                <h3>{photo.caption}</h3>
                <p>{photo.category}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
