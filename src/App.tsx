import { useEffect } from 'react'
import { Home } from './components/pages'
import { tg } from './lib'

function App() {
  useEffect(() => {
    tg.ready()
  }, [])

  

  return (  
    <>
    {/* initdata: {JSON.stringify(user, theme)}, initDatafrom: {tg.initData} */}
    <Home />
    </>
  )
}

export default App
