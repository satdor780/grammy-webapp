// src/store/telegramStore.ts
import { create } from "zustand";
import type { WebAppInitData, WebAppUser, ThemeParams } from "telegram-web-app";
import type { PromoCode } from "../api";

type TelegramState = {
  user: WebAppUser | null;
  themeParams: ThemeParams;
  initData: string;
  initDataUnsafe: Partial<WebAppInitData>; // ← changed
  colorScheme: "light" | "dark";
  isReady: boolean;
  isPremium: boolean;
  userId: number | null;
  promocode?: PromoCode;

  setPromocode: (code: PromoCode) => void;
};

export const useTelegramStore = create<TelegramState>((set) => {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    // fallback для dev / SSR / тестов
    return {
      user: null,
      themeParams: {},
      initData: "",
      initDataUnsafe: {},
      colorScheme: "light",
      isReady: false,
      isPremium: false,
      userId: null,
      promocode: undefined,
      setPromocode: (code) => set({ promocode: code }),
    };
  }

  tg.ready(); // важно вызвать один раз

  const unsafe = tg.initDataUnsafe as WebAppInitData; // ← каст, т.к. в @types это не всегда строго типизировано
  const user = unsafe.user ?? null;

  return {
    user,
    themeParams: tg.themeParams,
    initData: tg.initData,
    initDataUnsafe: unsafe,
    colorScheme: tg.colorScheme as "light" | "dark",
    isReady: true,
    isPremium: !!user?.is_premium,
    userId: user?.id ?? null,
    setPromocode: (code) => set({ promocode: code }),
  };
});
