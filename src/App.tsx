import { useEffect } from 'react'
import { Home } from './components/pages'
import { tg } from './lib'

function App() {
  useEffect(() => {
    tg.ready()
  }, [])
  
  return (
    <Home />
  )
}

export default App
