const services = [
  { day: 'Sunday', time: '9:00AM - 10:00AM', name: 'Morning Devotion' },
  { day: 'Sunday', time: '10:00AM - 10:30AM', name: 'Bible Study' },
  { day: 'Sunday', time: '10:30AM - 1:30PM', name: 'Main Service' },
  { day: 'Sunday', time: '9:00AM - 11:30AM', name: 'Sunday School' },
  { day: 'Wednesday', time: '5:00PM - 6:30PM', name: 'Mid Week Fellowship' },
  { day: 'Thursday', time: '9:00PM - 12:00AM', name: 'Power Thursday' }
]

export default function Services() {
  return (
    <div>
      <h2>Our Services</h2>
      <ul className="services-list">
        {services.map((s, i) => (
          <li key={i}><strong>{s.day}:</strong> {s.time} — {s.name}</li>
        ))}
      </ul>
    </div>
  )
}
