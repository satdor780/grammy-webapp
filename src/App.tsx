import { useEffect } from 'react'
import { Home } from './components/pages'
import { tg } from './lib'

function App() {
  useEffect(() => {
    tg.ready()
  }, [])

  const tgs = window.Telegram?.WebApp ?? {
    initData: '',
    ready: () => {},
    close: () => {},
    expand: () => {}
  }

  const initData = tgs.initData
  
  return (
    <>
    initdata: {initData}, initDatafrom: {tg.initData}
    <Home />
    </>
  )
}

export default App
