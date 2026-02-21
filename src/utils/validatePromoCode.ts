import type { PromoCode } from "@/api";

export function validatePromoCode(
  promo: PromoCode | undefined,
  promoCodeUsed: boolean | undefined,
) {
  if (!promo) return false;
  if (promoCodeUsed) return false;

  if (promo.expiresAt && promo.expiresAt < new Date()) return false;

  if (promo.maxUses !== undefined && promo.uses >= promo.maxUses) return false;

  return true;
}
