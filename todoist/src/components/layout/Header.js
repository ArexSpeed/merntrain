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
            <li>+</li>
            <li><MdInvertColors /></li>
          </ul>
        </div>
      </nav>
      Header
    </header>
  )
}

