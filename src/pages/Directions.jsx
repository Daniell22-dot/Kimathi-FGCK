import { useEffect, useRef } from 'react'

const CHURCH_LAT = -0.397906
const CHURCH_LNG = 36.956808

export default function Directions() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    const L = window.L
    if (!L) return

    const map = L.map(mapRef.current).setView([CHURCH_LAT, CHURCH_LNG], 16)

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    })

    const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Maps'
    })

    const baseLayers = {
      'Google Hybrid': googleHybrid,
      'OpenStreetMap': osmLayer
    }

    osmLayer.addTo(map)
    L.control.layers(baseLayers).addTo(map)

    L.marker([CHURCH_LAT, CHURCH_LNG]).addTo(map).bindPopup('Full Gospel Churches of Kenya, Nyeri')
    L.marker([-0.397778, 36.960833]).addTo(map).bindPopup('Dedan Kimathi University')

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
          <a href="https://www.youtube.com/@fgckkimathi-nyeri" target="_blank" rel="noopener noreferrer">
            Visit our channel
          </a>
        </p>
      </div>

      <div className="map-container">
        <div id="map" ref={mapRef}></div>
      </div>
    </div>
  )
}
