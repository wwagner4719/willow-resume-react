import TwoColumnLayout from './components/layout/TwoColumnLayout'
import Header from './components/Header'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Summary from './components/sections/Summary'
import Achievements from './components/sections/Achievements'
import Skills from './components/sections/Skills'
import PetProjects from './components/sections/PetProjects'
import RecentCourses from './components/sections/RecentCourses'
import DownloadButton from './components/DownloadButton'
import References from './components/sections/References'
import ReferencesForm from './components/ReferencesForm'

export default function App() {
  return (
    <>
      <div>
        <TwoColumnLayout
          main={
            <>
              <Header />
              <Experience />
              <Education />
            </>
          }
          sidebar={
            <>
              <Summary />
              <Achievements />
              <Skills />
              <PetProjects />
              <RecentCourses />
              <References />
              <ReferencesForm />
            </>
          }
        />
      </div>
      <DownloadButton />
    </>
  )
}
