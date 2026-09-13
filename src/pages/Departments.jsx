import Layout from '../components/Layout'

const departments = [
  { title: 'Praise & Worship Team', description: 'Leading the congregation in heartfelt worship through song and music.' },
  { title: 'Ushering Team', description: 'Welcoming members and ensuring smooth running of church services.' },
  { title: 'Youth Department', description: 'Empowering young people through discipleship, mentorship, and community projects. Join us for Fun Day on 10/10/2026!' },
  { title: 'Evangelism & Ministries', description: 'Sharing the Gospel locally and beyond through outreach and discipleship.' },
  { title: 'Instruments Team', description: 'Using musical gifts to enrich worship services and special events.' },
  { title: 'Wazee (Elders)', description: 'Providing spiritual guidance, wisdom, and oversight to the church family.' },
  { title: 'Akina Mama (Women)', description: 'Supporting women in faith, fellowship, and service within the church community.' }
]

export default function Departments() {
  return (
    <div>
      <h2>Our Church Departments</h2>
      <div className="departments-grid">
        {departments.map((d, i) => (
          <div key={i} className="department-card">
            <h3>{d.title}</h3>
            <p>{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
