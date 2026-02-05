// @grammy-webapp/src/store/basketStore.ts
import { create } from "zustand";
import type { Product } from "../types";

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
  getTotalPrice: (products: Product[]) => number; // ← теперь принимает массив продуктов
  getTotalItems: () => number;
  getItemQuantity: (productId: string) => number;
}

// Вспомогательная функция — найти актуальную цену для данного количества
function getEffectivePrice(product: Product, quantity: number): number {
  if (!product.discounts || product.discounts.length === 0) {
    return product.basePrice;
  }

  // Ищем самую большую minQuantity, которая ≤ quantity
  let bestPrice = product.basePrice;
  let maxMinQty = 0;

  for (const d of product.discounts) {
    if (d.minQuantity <= quantity && d.minQuantity > maxMinQty) {
      maxMinQty = d.minQuantity;
      bestPrice = d.discount; // здесь discount = новая цена
    }
  }

  return bestPrice;
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

  getTotalPrice: (products: Product[]) => {
    const { items } = get();
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;

      const pricePerUnit = getEffectivePrice(product, item.quantity);
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
