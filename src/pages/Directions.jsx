import { useState, useEffect, useRef } from 'react'
import { fetchDirections } from '../utils/api'

const CHURCH_COORDS = '36.956808,-0.397906'
const CHURCH_LAT = -0.397906
const CHURCH_LNG = 36.956808

export default function Directions() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const routeLayer = useRef(null)
  const [start, setStart] = useState('')
  const [routeInfo, setRouteInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    const L = window.L
    if (!L) return

    const map = L.map(mapRef.current).setView([CHURCH_LAT, CHURCH_LNG], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    L.marker([CHURCH_LAT, CHURCH_LNG]).addTo(map).bindPopup('Full Gospel Churches of Kenya, Nyeri')
    L.marker([-0.397778, 36.960833]).addTo(map).bindPopup('Dedan Kimathi University')

    mapInstance.current = map
  }, [])

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    setLoading(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        setStart(`${longitude},${latitude}`)
        setLoading(false)
      },
      () => {
        setError('Unable to retrieve your location')
        setLoading(false)
      }
    )
  }

  const getDirections = async (e) => {
    e.preventDefault()
    if (!start.trim()) return
    setLoading(true)
    setError('')
    setRouteInfo(null)
    try {
      const data = await fetchDirections(start, CHURCH_COORDS)
      setRouteInfo(data)
      const L = window.L
      if (L && mapInstance.current) {
        if (routeLayer.current) {
          mapInstance.current.removeLayer(routeLayer.current)
        }
        const latlngs = data.coordinates.map(([lon, lat]) => [lat, lon])
        routeLayer.current = L.polyline(latlngs, { color: '#007BFF', weight: 5 }).addTo(mapInstance.current)
        mapInstance.current.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] })
      }
    } catch (err) {
      setError(err.message || 'Failed to get directions')
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes} min`
  }

  const formatDistance = (meters) => {
    if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`
    return `${Math.round(meters)} m`
  }

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

      <div className="directions-card">
        <h3>Get Directions</h3>
        <form onSubmit={getDirections}>
          <label htmlFor="startLocation">Your location (longitude, latitude or address)</label>
          <input
            id="startLocation"
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="e.g. 36.95,-0.40 or Nairobi, Kenya"
          />
          <div className="directions-actions">
            <button type="submit" disabled={loading || !start.trim()}>
              {loading ? 'Calculating...' : 'Get Directions'}
            </button>
            <button type="button" onClick={useMyLocation} disabled={loading}>
              Use My Location
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        {routeInfo && (
          <div className="route-info">
            <p><strong>Distance:</strong> {formatDistance(routeInfo.distance)}</p>
            <p><strong>Duration:</strong> {formatDuration(routeInfo.duration)}</p>
          </div>
        )}
      </div>

      <div id="map" ref={mapRef}></div>
    </div>
  )
}
