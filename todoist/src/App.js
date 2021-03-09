import { useState } from "react"
import { Content } from "./components/layout/Content"
import { Header } from "./components/layout/Header"
import './App.scss'
import {ProjectsProvider, SelectedProjectProvider} from './context'

export const App = ({darkModeDefault = false}) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testod="application"
          className={darkMode? 'darkmode' : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
    </ProjectsProvider>
    </SelectedProjectProvider>
  )
}

