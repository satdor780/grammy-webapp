import type { CheckUserPromoCodeResponse } from "./types.ts";

const API_BASE = import.meta.env.VITE_SERVER_URI!;

export async function checkUserPromoCode(
  initData: string,
): Promise<CheckUserPromoCodeResponse | null> {
  // ← null если нет промокода
  const res = await fetch(
    `${API_BASE}/api/checkuserpromocode?initData=${encodeURIComponent(initData)}`,
    { method: "GET" },
  );

  // 404 = нет промокода, это не ошибка
  if (res.status === 404) return null;

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      json && typeof json.error === "string" ? json.error : "Request failed";
    throw new Error(msg);
  }

  return json;
}
