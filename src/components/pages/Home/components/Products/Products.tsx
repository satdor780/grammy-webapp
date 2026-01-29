import { Product } from './components'
import styles from './Products.module.css'

export const Products = () => {
    return (
        <div className={styles.products}>
            <Product />
            <Product />
            <Product />
        </div>
    )
}