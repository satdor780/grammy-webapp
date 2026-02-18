const API_BASE = import.meta.env.VITE_SERVER_URI ?? "http://localhost:3000";

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface SubmitOrderPayload {
  initData: string;
  items: OrderItem[];
  totalPrice: number;
}

export interface SubmitOrderResponse {
  success: boolean;
  orderId?: string;
}

export async function submitOrder(
  payload: SubmitOrderPayload,
): Promise<SubmitOrderResponse> {
  const res = await fetch(`${API_BASE}/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      json && typeof json.error === "string"
        ? json.error
        : "Failed to submit order";
    throw new Error(msg);
  }

  return json;
}
