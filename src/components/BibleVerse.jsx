import { useEffect, useState } from 'react'
import { getDailyVerse } from '../utils/bibleVerses'

export default function BibleVerse() {
  const [verse, setVerse] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const v = getDailyVerse()
    setVerse(v)

    const timer = setTimeout(() => setVisible(true), 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!verse || !visible) return null

  return (
    <div className="daily-verse-popup">
      <div className="verse-content">
        <button className="close-verse" onClick={() => setVisible(false)}>
          &times;
        </button>
        <h3>Verse of the Day</h3>
        <p className="verse-text">"{verse.text}"</p>
        <p className="verse-ref">— {verse.reference}</p>
      </div>
    </div>
  )
}
