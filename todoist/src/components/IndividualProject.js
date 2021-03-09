import {useState} from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import { useProjectsValue, useSelectedProjectValue } from "../context"
import db from '../firebase'

const IndividualProject = ({project}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const {projects, setProjects} = useProjectsValue();
  const {setSelectedProject} = useSelectedProjectValue();

  const deleteProject = docId => {
    db.collection('projects').doc(docId).delete()
    .then(() => {
      setProjects([...projects])
      setSelectedProject('INBOX')
    })
  }
  return (
    <div>
      <span className="sidebar__dot">*</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span className="sidebar__project-delete" data-testid="delete-project" onClick={() => setShowConfirm(!showConfirm)}>
        <FaTrashAlt />
      {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure?</p>
              <button onClick={() => deleteProject(project.docId)}>
                Delete 
              </button>
                <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </div>
        )}
      </span>
    </div>
  )
}

export default IndividualProject
