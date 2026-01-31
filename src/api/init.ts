import { initData } from "../lib"
import type { InitResponse } from "./api"

export async function init(): Promise<InitResponse> {
    const tg = window.Telegram?.WebApp ?? {
  initData: '',
  ready: () => {},
  close: () => {},
  expand: () => {}
}
  const res = await fetch('http://localhost:3000/api/init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      initData: tg.initData
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
