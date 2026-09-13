import { useEffect, useRef } from 'react'
import Layout from '../components/Layout'

export default function Directions() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const L = window.L
    if (!L) return

    const church = [-0.397778, 36.956667]
    const university = [-0.397778, 36.960833]

    const map = L.map(mapRef.current).setView([-0.397778, 36.95875], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    L.marker(church).addTo(map).bindPopup('Full Gospel Churches of Kenya, Nyeri')
    L.marker(university).addTo(map).bindPopup('Dedan Kimathi University')

    L.polyline([church, university], { color: '#007BFF', weight: 4 }).addTo(map)

    mapInstance.current = map
  }, [])

  return (
    <div>
      <h2>Directions & Contact</h2>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Phone: <a href="tel:+254700000000">+254 700 000 000</a></p>
        <p>
          YouTube:{' '}
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            Visit our channel
          </a>
        </p>
      </div>
      <div id="map" ref={mapRef}></div>
    </div>
  )
}
