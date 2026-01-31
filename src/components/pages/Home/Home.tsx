import { useEffect, useState } from 'react'

import { Products } from './components'
import usdtIcon from '/icons/usdt.svg'
import styles from './Home.module.css'
import { Button } from '../../shared/ui'
import { init } from '../../../api'
import type { InitResponse } from '../../../api/api'

export const Home = () => {
  const [data, setData] = useState<InitResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
      .then(res => {
        setData(res)
      })
      .catch(err => {
        console.error('Init error:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>load</h1>
  }

  if (!data) {
    return <div className="container">Failed to load data</div>
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

      <p>{JSON.stringify(data)}</p>

      <div className={styles.button}>
        <Button>Buy Now 15$</Button>
      </div>
    </div>
  )
}
