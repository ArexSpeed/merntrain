import {FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar} from 'react-icons/fa'

export const Sidebar = () => {
  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar_generic">
        <li><span><FaInbox /></span></li>
        <li>
          <span><FaRegCalendar /></span>
          <span>Today</span>
        </li>
        <li>
          <span><FaRegCalendarAlt /></span>
          <span>Next 7 days</span>
        </li>
      </ul>

      <div className="sidebar__midle">
        <span><FaChevronDown /></span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">
        Projects will be here
      </ul>

      Add Projects Component Here
    </div>
  )
}
