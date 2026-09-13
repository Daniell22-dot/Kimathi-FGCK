import Layout from '../components/Layout'

const departments = [
  {
    slug: 'praise-worship',
    title: 'Praise & Worship Team',
    description: 'Leading the congregation in heartfelt worship through song and music.',
    projects: ['Sunday worship leading', 'Special event worship', 'Choir rehearsals']
  },
  {
    slug: 'ushering',
    title: 'Ushering Team',
    description: 'Welcoming members and ensuring smooth running of church services.',
    projects: ['Sunday service coordination', 'Event setup and cleanup', 'Visitor welcome ministry']
  },
  {
    slug: 'youth',
    title: 'Youth Department',
    description: 'Empowering young people through discipleship, mentorship, and community projects.',
    projects: ['Youth Bible study', 'Youth Fun Day - 10/10/2026', 'Community outreach', 'Mentorship programs']
  },
  {
    slug: 'evangelism',
    title: 'Evangelism & Ministries',
    description: 'Sharing the Gospel locally and beyond through outreach and discipleship.',
    projects: ['Local outreach programs', 'Door-to-door evangelism', 'Community service projects']
  },
  {
    slug: 'instruments',
    title: 'Instruments Team',
    description: 'Using musical gifts to enrich worship services and special events.',
    projects: ['Instrumental worship', 'Special performances', 'Music training sessions']
  },
  {
    slug: 'wazee',
    title: 'Wazee (Elders)',
    description: 'Providing spiritual guidance, wisdom, and oversight to the church family.',
    projects: ['Spiritual counseling', 'Church governance', 'Mentorship of leaders']
  },
  {
    slug: 'akina-mama',
    title: 'Akina Mama (Women)',
    description: 'Supporting women in faith, fellowship, and service within the church community.',
    projects: ['Women fellowship', 'Community service', 'Family support programs']
  }
]

export function getDepartmentBySlug(slug) {
  return departments.find(d => d.slug === slug)
}

export function getAllDepartments() {
  return departments
}

export default function Departments() {
  return (
    <div>
      <h2>Our Church Departments</h2>
      <div className="departments-grid">
        {departments.map((dept) => (
          <a key={dept.slug} href={`/departments/${dept.slug}`} className="department-card">
            <h3>{dept.title}</h3>
            <p>{dept.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
