import type { Product } from "../types/product"


export interface InitResponse {
  user: {
    balance: number
  }
  products: Product[]
}
