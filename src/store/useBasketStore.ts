// @grammy-webapp/src/store/basketStore.ts
import { create } from "zustand";
import type { Product } from "../types";
import type { PromoCode } from "@/api";

export interface BasketItem {
  productId: string;
  quantity: number;
  // НЕ храним цену здесь — она может меняться в зависимости от количества
}

interface BasketState {
  items: BasketItem[];
  addItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: (products: Product[], promoCode?: PromoCode) => number; // ← теперь принимает массив продуктов
  getTotalItems: () => number;
  getItemQuantity: (productId: string) => number;
}

function getEffectivePrice(
  product: Product,
  quantity: number,
  promoCode?: PromoCode,
): number {
  // 1. Quantity-based price
  let quantityPrice = product.basePrice;
  let maxMinQty = 0;
  for (const d of product.discounts ?? []) {
    if (d.minQuantity <= quantity && d.minQuantity > maxMinQty) {
      maxMinQty = d.minQuantity;
      quantityPrice = d.discount; // d.discount stores the new per-unit price
    }
  }

  // 2. Promo code price (only if this product is in the promo's scope)
  let promoPrice: number | null = null;
  if (promoCode) {
    const appliesToThis = promoCode.appliesToProducts.some(
      (p) => p.slug === product.slug,
    );
    if (appliesToThis) {
      if (promoCode.discountType === "percent") {
        promoPrice = product.basePrice * (1 - promoCode.discount / 100);
      } else {
        // fixed discount
        promoPrice = Math.max(0, product.basePrice - promoCode.discount);
      }
    }
  }

  // 3. Pick the most advantageous price
  if (promoPrice !== null) {
    return Math.min(quantityPrice, promoPrice);
  }
  return quantityPrice;
}

export const useBasketStore = create<BasketState>((set, get) => ({
  items: [],

  addItem: (productId) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === productId);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        items: [...state.items, { productId, quantity: 1 }],
      };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  clearBasket: () => set({ items: [] }),

  getTotalPrice: (products: Product[], promoCode?: PromoCode) => {
    const { items } = get();
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;

      const pricePerUnit = getEffectivePrice(product, item.quantity, promoCode);
      return sum + pricePerUnit * item.quantity;
    }, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getItemQuantity: (productId: string) => {
    const item = get().items.find((i) => i.productId === productId);
    return item?.quantity ?? 0;
  },
}));
