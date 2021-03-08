import {MdInvertColors} from 'react-icons/md'
export const Header = () => {
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="https://pbs.twimg.com/profile_images/1235302046460497920/WcXKmXnQ_400x400.jpg" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li data-testid="quick-add-task-action" className="settings__add">+</li>
            <li data-testid="dark-mode-action" className="settings__darkmode"><MdInvertColors /></li>
          </ul>
        </div>
      </nav>
      Header
    </header>
  )
}

