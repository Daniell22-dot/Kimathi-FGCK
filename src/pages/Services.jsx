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
      <div className="table-wrapper">
        <table className="services-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => (
              <tr key={i}>
                <td><strong>{s.day}</strong></td>
                <td>{s.time}</td>
                <td>{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
