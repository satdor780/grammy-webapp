import { Products } from "./components"
import usdtIcon from '/icons/usdt.svg'

import styles from './Home.module.css'
import { Button } from "../../shared/ui"

export const Home = () => {
    return (
        <div className="container">
            <div className={styles.header}>
                <h1 className={styles.header__title}>Mailzy</h1>
                <div className={styles.header__balance}>
                    <span>Balance: </span>
                    <div className={styles.header__balance_info}>
                        <img src={usdtIcon} alt="USDT" />
                        <b>650$</b>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <Products />
            </div>
            <div className={styles.button}>
                <Button >Buy Now {'15$'}</Button>
            </div>
        </div>
    )
}