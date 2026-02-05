import type { FC } from "react"
import type { Product } from "../../../../types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../shadcn/ui/card"
import { Badge } from "../../../shadcn/ui/badge"
import { Progress } from "../../../shadcn/ui/progress"

interface ProductCardProps {
  product: Product
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const sold = Math.max(0, 100 - product.available)
  const progress = Math.min(100, sold)

  return (
    <Card className="group relative w-full max-w-sm overflow-hidden rounded-3xl border bg-background/60 backdrop-blur transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* TAGS */}
        {product.tags.length > 0 && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-black/60 text-white backdrop-blur"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* HEADER */}
      <CardHeader className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.fullDescription}
        </p>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="space-y-5">
        {/* PRICE */}
        <div className="flex items-center justify-between rounded-2xl border bg-muted/50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена</span>
          <span className="text-lg font-semibold">
            {product.basePrice} {product.currency}
          </span>
        </div>

        {/* AVAILABILITY */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">В наличии</span>
            <span className="font-medium">{product.available}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Продано</span>
            <span className="font-medium">{sold}</span>
          </div>

          <Progress value={progress} />
        </div>

        {/* DISCOUNTS */}
        {product.discounts.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Скидки</span>

            <div className="grid gap-2">
              {product.discounts.map((discount, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border bg-background px-3 py-2 text-xs"
                >
                  <span className="text-muted-foreground">
                    от {discount.minQuantity} шт.
                  </span>
                  <span className="font-medium text-green-500">
                    −{discount.discount}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* FOOTER */}
      <CardFooter>
        <button className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.97]">
          Купить
        </button>
      </CardFooter>
    </Card>
  )
}
