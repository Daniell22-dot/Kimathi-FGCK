import { useState } from 'react'

const departments = [
  {
    title: 'Praise & Worship Team',
    description: 'Leading the congregation in heartfelt worship through song and music.',
    projects: ['Sunday worship leading', 'Special event worship', 'Choir rehearsals']
  },
  {
    title: 'Ushering Team',
    description: 'Welcoming members and ensuring smooth running of church services.',
    projects: ['Sunday service coordination', 'Event setup and cleanup', 'Visitor welcome ministry']
  },
  {
    title: 'Youth Department',
    description: 'Empowering young people through discipleship, mentorship, and community projects.',
    projects: ['Youth Bible study', 'Youth Fun Day - 10/10/2026', 'Community outreach', 'Mentorship programs']
  },
  {
    title: 'Evangelism & Ministries',
    description: 'Sharing the Gospel locally and beyond through outreach and discipleship.',
    projects: ['Local outreach programs', 'Door-to-door evangelism', 'Community service projects']
  },
  {
    title: 'Instruments Team',
    description: 'Using musical gifts to enrich worship services and special events.',
    projects: ['Instrumental worship', 'Special performances', 'Music training sessions']
  },
  {
    title: 'Wazee (Elders)',
    description: 'Providing spiritual guidance, wisdom, and oversight to the church family.',
    projects: ['Spiritual counseling', 'Church governance', 'Mentorship of leaders']
  },
  {
    title: 'Akina Mama (Women)',
    description: 'Supporting women in faith, fellowship, and service within the church community.',
    projects: ['Women fellowship', 'Community service', 'Family support programs']
  }
]

export default function Departments() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      <h2>Our Church Departments</h2>
      <div className="departments-list">
        {departments.map((dept, i) => (
          <div key={i} className="department-accordion">
            <button
              className={`department-header${openIndex === i ? ' open' : ''}`}
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              <span>{dept.title}</span>
              <span className="department-arrow">{openIndex === i ? '▲' : '▼'}</span>
            </button>
            {openIndex === i && (
              <div className="department-body">
                <p>{dept.description}</p>
                <h4>Projects & Activities</h4>
                <ul className="department-projects">
                  {dept.projects.map((project, j) => (
                    <li key={j}>{project}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
