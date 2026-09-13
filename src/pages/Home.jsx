import { useState, useEffect } from 'react'
import { fetchAnnouncements } from '../utils/api'

const verses = [
  { text: 'For where two or three gather in my name, there am I with them.', ref: 'Matthew 18:20' },
  { text: 'Let everything that has breath praise the Lord.', ref: 'Psalm 150:6' },
  { text: 'Trust in the Lord with all your heart and lean not on your own understanding.', ref: 'Proverbs 3:5' },
  { text: 'I can do all this through him who gives me strength.', ref: 'Philippians 4:13' },
  { text: 'The Lord is my shepherd, I lack nothing.', ref: 'Psalm 23:1' },
  { text: 'Be strong and courageous. Do not be afraid; do not be discouraged.', ref: 'Joshua 1:9' }
]

export default function Home() {
  const [announcements, setAnnouncements] = useState([])
  const [verse, setVerse] = useState(verses[0])

  useEffect(() => {
    fetchAnnouncements()
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]))
  }, [])

  useEffect(() => {
    const today = new Date().getDate()
    setVerse(verses[today % verses.length])
  }, [])

  return (
    <div>
      <section className="hero">
        <h2>Welcome to FGCK Nyeri</h2>
        <p>
          Full Gospel Churches of Kenya, Nyeri Town LCA Kimathi Branch is a vibrant,
          Christ-centered community committed to spreading the love of Jesus Christ.
          We invite you to worship with us and experience God's transforming power.
        </p>
        <div className="hero-buttons">
          <a href="/services" className="btn btn-primary">Our Services</a>
          <a href="/directions" className="btn btn-secondary">Find Us</a>
        </div>
      </section>

      <div className="verse-widget">
        <h4>Verse of the Day</h4>
        <p>"{verse.text}"</p>
        <span>- {verse.ref}</span>
      </div>

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

      <section>
        <h2>Visit Our YouTube Channel</h2>
        <p>Catch up on sermons, bible studies, and worship sessions.</p>
        <a
          href="https://www.youtube.com/@fgckkimathi-nyeri"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Visit Channel
        </a>
      </section>
    </div>
  )
}
