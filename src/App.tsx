import TwoColumnLayout from './components/layout/TwoColumnLayout'
import Header from './components/Header'

export default function App() {
  return (
    <TwoColumnLayout
      main={
        <>
          <Header />
        </>
      }
      sidebar={<></>}
    />
  )
}
