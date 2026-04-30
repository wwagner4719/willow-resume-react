import TwoColumnLayout from './components/layout/TwoColumnLayout'
import Header from './components/Header'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'

export default function App() {
  return (
    <TwoColumnLayout
      main={
        <>
          <Header />
          <Experience />
          <Education />
        </>
      }
      sidebar={<></>}
    />
  )
}
