import { Product } from './components'
import styles from './Products.module.css'

const images = [
    '/images/paypal.jpg',
    '/images/mercury.jpg',
    '/images/relay.jpg',
]

export const Products = () => {
    return (
        <div className={styles.products}>
            {images.map((e) => (
                <Product img={e} />
            ))}
        </div>
    )
}