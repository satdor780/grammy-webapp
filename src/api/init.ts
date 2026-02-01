
import type { InitResponse } from "./api"

export async function init(initData): Promise<InitResponse> {
  const res = await fetch('http://localhost:3000/api/init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      initData: initData
    })
  })

  // Всегда читаем JSON
  const json = await res.json().catch(() => null)

  // Если статус ошибки
  if (!res.ok) {
    const msg =
      json && typeof json.error === 'string'
        ? json.error
        : 'Init failed'
    throw new Error(msg)
  }

  return json
}
