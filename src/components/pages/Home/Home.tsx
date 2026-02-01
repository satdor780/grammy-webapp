import { useEffect, useState } from 'react'

import { Products } from './components'
import usdtIcon from '/icons/usdt.svg'
import styles from './Home.module.css'
import { Button, DebugPanel } from '../../shared/ui'
import { init } from '../../../api'
import type { InitResponse } from '../../../api/api'

export const Home = () => {
  const [data, setData] = useState<InitResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  window.Telegram?.WebApp?.ready();
  
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const theme = window.Telegram?.WebApp?.themeParams;
  const initData = window.Telegram?.WebApp?.initData;

  useEffect(() => {
    init(initData)
      .then(res => {
        setData(res)
      })
      .catch(err => {
        console.error('Init error:', err)
        setError(
          err instanceof Error ? err.message : JSON.stringify(err)
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>load</h1>
  }

  if (error) {
    return (
      <DebugPanel title="INIT ERROR">
        {JSON.stringify(initData)}
      </DebugPanel>
    )
  }

  if (!data) {
    return (
      <DebugPanel title="NO DATA">
        data is null
      </DebugPanel>
    )
  }

  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.header__title}>Mailzy</h1>

        <div className={styles.header__balance}>
          <span>Balance:</span>
          <div className={styles.header__balance_info}>
            <img src={usdtIcon} alt="USDT" />
            <b>{data.user.balance}$</b>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Products />
      </div>

      <DebugPanel title="INIT RESPONSE">
        {JSON.stringify(data, null, 2)}
      </DebugPanel>

      <div className={styles.button}>
        <Button>Buy Now 15$</Button>
      </div>
    </div>
  )
}
