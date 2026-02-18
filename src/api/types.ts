import type { Product } from "../types/";

export interface InitResponse {
  success: boolean;
  user: User;
  userBalance?: number;
  warehouse: {
    productId: string;
    available: number;
  }[];
  products: Product[];
}

export interface User {
  _id: string;
  telegramId: number;
  userName: string;
  firstName: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  promoCode: string;
  __v: number;
}

export interface CheckUserPromoCodeResponse {
  valid: boolean;
  promoCode: string | null;

  message?: string;

  discount?: number;
  discountType?: "percent" | "fixed";
  name?: string;
  expiresAt?: string | null;
  appliesTo?: string[];
  remainingUses?: number | null;
}
