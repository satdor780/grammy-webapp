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
  promoCodeUsed: boolean;
  __v: number;
}

// export interface  {
//   valid: boolean;
//   promoCode: string | null;

//   message?: string;

//   discount?: number;
//   discountType?: "percent" | "fixed";
//   name?: string;
//   expiresAt?: string | null;
//   appliesTo?: string[];
//   remainingUses?: number | null;
// }

export interface CheckUserPromoCodeResponse {
  promoCode: PromoCode;
  valid: boolean;
  message: string;
}

export interface PromoCode {
  _id: string;
  name: string;
  discount: number;
  discountType: string;
  code: string;
  source: string;
  uses: number;
  maxUses: number;
  appliesToProducts: AppliesToProduct[];
  expiresAt: Date;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AppliesToProduct {
  productId: string;
  name: string;
  slug: string;
  _id: string;
}
