import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

const announcements = [
  "Welcome to our new website!",
  "Youth Bible study this Friday.",
  "Youth Fun Day on 10/10/2026!"
]

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <section>
        <h2>Welcome to FGCK Nyeri</h2>
        <p>We are a Christ-centered community dedicated to spreading the Gospel.</p>
      </section>
      <section>
        <h2>Announcements</h2>
        <p className="announcement-text">{announcements[index]}</p>
      </section>
    </div>
  )
}
