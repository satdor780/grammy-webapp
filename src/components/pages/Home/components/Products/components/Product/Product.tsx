import { useState } from 'react'
import { Button } from '../../../../../../shared/ui'
import styles from './Product.module.css'
import usdtIcon from '/icons/usdt.svg'
import minusIcon from '/icons/minus.svg'
import plusIcon from '/icons/plus.svg'

export const Product = ({img}: {img: string}) => {
    const [isSelecting, setIsSelecting] = useState(false)
    const [count, setCount] = useState(1)

    const handleBuyClick = () => {
        setIsSelecting(true)
        setCount(1)
    }

    const handleCancel = () => {
        setIsSelecting(false)
        setCount(1)
    }

    const increment = () => setCount(prev => prev + 1)
    const decrement = () => {
        if (count > 1) setCount(prev => prev - 1)
    }

    return (
        <div className={styles.product}>
            <div className={styles.product__image}>
                <img src={img} />
                <div className={styles.product__tags}>
                    <div className={styles.product__tag}>Популярное</div>
                    <div className={styles.product__tag}>скидка</div>
                </div>
            </div>

            <div className={styles.product__content}>
                <div className={styles.product__content_header}>
                    <p className={styles.product__name}>Squareup LLC - In stock</p>
                    <div className={styles.product__price}>
                        <img src={usdtIcon} alt="USDT" />
                        <span>650$</span>
                    </div>
                </div>

                <div className={styles.product__content_footer}>
                    <p className={styles.product__available}>available: <b>26</b></p>
                    <p className={styles.product__sales}>sales: <b>132</b></p>
                </div>

                {/* BUTTON / COUNTER */}
                {!isSelecting ? (
                    <Button text='Buy Now' onClick={handleBuyClick} />
                ) : (
                    <div className={styles.product__counter}>
                        <Button onClick={decrement}><img src={minusIcon} alt="minus" className={styles.minus}/></Button>
                        <div className={styles.product__count}>{count}</div>
                        <Button onClick={increment}><img src={plusIcon} alt="plus" className={styles.plus}/></Button>

                        <Button
                            className={styles.product__cancel}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
