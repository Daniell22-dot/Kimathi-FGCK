const leadership = [
  {
    category: 'Pastor',
    icon: '✝️',
    members: [
      { name: 'Pastor Name', role: 'Senior Pastor', photo: 'https://ui-avatars.com/api/?name=Pastor&background=007BFF&color=fff&size=200' }
    ]
  },
  {
    category: 'Church Elders',
    icon: '👴',
    members: [
      { name: 'Elder Name 1', role: 'Church Elder', photo: 'https://ui-avatars.com/api/?name=Elder+1&background=28a745&color=fff&size=200' },
      { name: 'Elder Name 2', role: 'Church Elder', photo: 'https://ui-avatars.com/api/?name=Elder+2&background=28a745&color=fff&size=200' }
    ]
  },
  {
    category: 'Youth Leaders',
    icon: '🧑',
    members: [
      { name: 'Charles', role: 'Youth Chairperson', photo: 'https://ui-avatars.com/api/?name=Charles&background=ffc107&color=333&size=200' },
      { name: 'Assistant Chairperson', role: 'Youth Assistant', photo: 'https://ui-avatars.com/api/?name=Assistant&background=ffc107&color=333&size=200' }
    ]
  },
  {
    category: 'Department Heads',
    icon: '📋',
    members: [
      { name: 'Praise Team Lead', role: 'Praise & Worship', photo: 'https://ui-avatars.com/api/?name=Praise&background=dc3545&color=fff&size=200' },
      { name: 'Ushering Lead', role: 'Ushering Team', photo: 'https://ui-avatars.com/api/?name=Usher&background=dc3545&color=fff&size=200' }
    ]
  }
]

export default function Leadership() {
  return (
    <div>
      <h2>Church Leadership 🙏</h2>
      <p style={{ marginBottom: '1.5rem', color: '#555' }}>
        Meet the people God has called to serve and lead our church family.
      </p>
      {leadership.map((group, i) => (
        <div key={i} className="leadership-category">
          <h3>{group.icon} {group.category}</h3>
          <div className="leadership-grid">
            {group.members.map((member, j) => (
              <div key={j} className="leader-card">
                <img src={member.photo} alt={member.name} className="leader-photo" />
                <div className="leader-info">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
