import type { FC } from "react"
import type { Product } from "../../../../types"
interface ProductCardProps {
  product: Product,
  available?: number,
}

import { useState } from "react";
import usdtIcon from "/icons/usdt.svg";
import minusIcon from "/icons/minus.svg";
import plusIcon from "/icons/plus.svg";
import { Button } from "../../../shadcn/ui/button"
import { useBasketStore } from "../../../../store";

// const VITE_SERVER_URI = import.meta.env.VITE_SERVER_URI
const VITE_SERVER_URI = 'http://localhost:3000'

export const ProductCard: FC<ProductCardProps> = ({ product, available }) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleBuyClick = () => {
    setIsSelecting(true);
    handleIncrement()
  };

  const handleCancel = () => {
    updateQuantity(product.id, 0);
    setIsSelecting(false);
  };

  const { getItemQuantity, addItem, updateQuantity } = useBasketStore();

  const quantity = getItemQuantity(product.id);

  const handleIncrement = () => {
    if (quantity === 0) {
      addItem(product.id);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      updateQuantity(product.id, 0);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex flex-col">
      <div className="relative h-[260px] w-full bg-neutral-100">
        <img
          src={`${VITE_SERVER_URI}${product.image}`}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.jpg';
            e.currentTarget.onerror = null
          }}
          alt={product.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-3 top-3 flex gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-black/75 px-3 py-1 text-xs font-medium  text-white">
              {tag}
            </span> 
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3 relative">
          <p className="text-[15px] font-semibold text-neutral-900 uppercase max-w-[calc(100%-80px)]">
            {product.title}
          </p>

          <div className="flex items-center gap-1.5 text-[15px] font-semibold text-neutral-900 absolute right-0">
            <img src={usdtIcon} alt="USDT" className="h-[18px] w-[18px]" />
            <span>{product.basePrice} {product.currency}</span>
          </div>
        </div>

        <div className="">
        <p className="whitespace-pre-line text-[14px] font-medium line-height-[19px] text-neutral-900">
          {product.fullDescription}
        </p>
        </div>

        {product.discounts.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-neutral-900">Скидки</span>

            <div className="grid gap-2 pt-1">
              {product.discounts.map((discount, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border text-xs"
                >
                  <span className="text-neutral-900 font-medium">
                    от {discount.minQuantity} шт.
                  </span>
                  <span className="font-medium text-green-500">
                    {discount.discount}$
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between text-[13px] text-neutral-500">
          <p>
            available: <b className="text-neutral-900">{(available && available !== 0) ? available: 'out of stock'}</b>
          </p>
          {/* <p>
            sales: <b className="text-neutral-900">132</b>
          </p> */}
        </div>

        {!isSelecting ? (
          <Button onClick={handleBuyClick} disabled={!available && available === 0} className="w-full bg-black text-white h-[40px] ">
            Buy Now
          </Button>
          ) : (
            <div className="grid grid-cols-[1fr_auto_1fr_2fr] items-center gap-3">
              <Button
            variant="secondary"
            onClick={handleDecrement}
            className="bg-black text-white h-[40px]"
          >
            <img src={minusIcon} alt="minus" className="h-[10px]" />
          </Button>

          <div className="min-w-[32px] text-center text-base font-semibold text-black">
            {quantity}
          </div>

          <Button
            variant="secondary"
            onClick={handleIncrement}
            className="bg-black text-white h-[40px]"
          >
            <img src={plusIcon} alt="plus" className="h-[20px]" />
          </Button>

            <Button
              variant="outline"
              onClick={handleCancel}
              className="ml-auto w-full h-[40px] border-red-500 text-red-500 hover:bg-red-50"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
