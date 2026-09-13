const services = [
  { day: 'Sunday', time: '8-9 AM', name: 'Youth Service' },
  { day: 'Sunday', time: '9 AM', name: 'Sunday School' },
  { day: 'Sunday', time: '9-10 AM', name: 'Devotion' },
  { day: 'Sunday', time: '10-10:45 AM', name: 'Bible Study' },
  { day: 'Sunday', time: '11 AM-2 PM', name: 'Main Service' }
]

export default function Services() {
  return (
    <div>
      <h2>Our Services 🗓️</h2>
      <ul className="services-list">
        {services.map((s, i) => (
          <li key={i}><strong>{s.day}:</strong> {s.time} — {s.name}</li>
        ))}
      </ul>
    </div>
  )
}
