import type { Product } from "../types/";

export interface InitResponse {
  success: boolean;
  user: User;
  userBalance?: number;
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
  __v: number;
}
