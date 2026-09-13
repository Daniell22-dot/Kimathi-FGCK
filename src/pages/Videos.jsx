import { useState, useEffect } from 'react'
import { fetchVideos } from '../utils/api'

function getYouTubeId(url) {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function Videos() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
      .then(setVideos)
      .catch(() => setVideos([]))
  }, [])

  return (
    <div>
      <h2>Videos 📺</h2>
      {videos.length === 0 && <p>No videos available at the moment.</p>}
      <div className="videos-grid">
        {videos.map(video => {
          const videoId = getYouTubeId(video.youtube_url)
          if (!videoId) return null
          return (
            <div key={video.id} className="video-card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <div className="video-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
