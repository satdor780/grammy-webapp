import type { Product } from "../../../types"
import { ProductCard } from "./components"

const product: Product = {
    "_id": "6983d722737e28abd2e2177c",
    "type": "custom",
    "slug": "paypal",
    "title": "paypal",
    "image": "http://localhost:3000/api/uploads/51a930e6-ba6e-45ff-bad9-792209c3a121.jpg",
    "shortDescription": "short desc",
    "fullDescription": "desctiption",
    "basePrice": 100,
    "currency": "USDT",
    "available": 0,
    "discounts": [
      {
        "minQuantity": 30,
        "discount": 0.9
      }
    ],
    "tags": [
      "tag1",
      "tag2"
    ],
    "createdAt": "2026-02-04T23:32:50.184Z",
    "updatedAt": "2026-02-04T23:32:50.184Z",
    "__v": 0,
    "id": "6983d722737e28abd2e2177c"
  }

export const Products = () => {
    return (
        <div className="flex flex-col justify-center items-center px-0 py-5">
            {/* {product.map((e) => (
                <ProductCard product={e} />
            ))} */}
            <ProductCard product={product} />
        </div>
    )
}