import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { getDepartmentBySlug, getAllDepartments } from '../pages/Departments'

export default function DepartmentPage() {
  const { slug } = useParams()
  const dept = getDepartmentBySlug(slug)
  const allDepts = getAllDepartments()

  if (!dept) {
    return (
      <div>
        <h2>Department not found</h2>
        <Link to="/departments">Back to Departments</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/departments">Departments</Link> / {dept.title}
      </div>
      <h2>{dept.title}</h2>
      <p className="lead">{dept.description}</p>

      <div className="department-detail">
        <h3>Projects & Activities</h3>
        <ul className="department-projects">
          {dept.projects.map((project, i) => (
            <li key={i}>{project}</li>
          ))}
        </ul>
      </div>

      <div className="other-departments">
        <h3>Other Departments</h3>
        <div className="departments-grid-small">
          {allDepts.filter(d => d.slug !== slug).map(d => (
            <Link key={d.slug} to={`/departments/${d.slug}`} className="dept-link">
              {d.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
