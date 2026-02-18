import type { CheckUserPromoCodeResponse } from "./types.ts";

export async function checkUserPromoCode(
  initData: string,
): Promise<CheckUserPromoCodeResponse> {
  const res = await fetch(
    `http://localhost:3000/api/checkuserpromocode?initData=${encodeURIComponent(initData)}`,
    {
      method: "GET",
    },
  );

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      json && typeof json.error === "string" ? json.error : "Request failed";
    throw new Error(msg);
  }

  return json;
}
