import { useState } from 'react'
import {MdInvertColors} from 'react-icons/md'
import { AddTask } from '../AddTask'
export const Header = ({darkMode, setDarkMode}) => {
  const [shouldShowMain, setShouldShowMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="https://pbs.twimg.com/profile_images/1235302046460497920/WcXKmXnQ_400x400.jpg" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li 
              data-testid="quick-add-task-action" 
              className="settings__add"
              onClick={() => {setShowQuickAddTask(true); setShouldShowMain(true)}}
            >
              +
            </li>
            <li 
              data-testid="dark-mode-action"
              className="settings__darkmode"
              onClick={() => setDarkMode(!darkMode)}
            >
              <MdInvertColors />
            </li>
          </ul>
        </div>
      </nav>
      <AddTask 
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  )
}

