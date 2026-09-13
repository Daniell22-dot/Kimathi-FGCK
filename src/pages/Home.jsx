import { useState, useEffect } from 'react'
import { fetchAnnouncements } from '../utils/api'

export default function Home() {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    fetchAnnouncements()
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]))
  }, [])

  return (
    <div>
      <section>
        <h2>Welcome to FGCK Nyeri</h2>
        <p>We are a Christ-centered community dedicated to spreading the Gospel.</p>
      </section>
      <section>
        <h2>Announcements</h2>
        {announcements.length === 0 && <p>No announcements at the moment.</p>}
        {announcements.map(item => (
          <div key={item.id} className="announcement-item">
            <strong>{item.title}</strong>
            <p>{item.message}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
