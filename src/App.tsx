import { useEffect } from 'react'
import { Home } from './components/pages'
import { tg } from './lib'

function App() {
  useEffect(() => {
    tg.ready()
  }, [])

  window.Telegram?.WebApp?.ready();
  
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const theme = window.Telegram?.WebApp?.themeParams;

  return (
    <>
    initdata: {user}{theme}, initDatafrom: {tg.initData}
    <Home />
    </>
  )
}

export default App
