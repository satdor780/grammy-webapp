import { initData } from "../lib"
import type { InitResponse } from "./api"

export async function init(): Promise<InitResponse> {
  const res = await fetch('http://localhost:3000/api/init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      initData: initData 
    })
  })

  if (!res.ok) {
    throw new Error('Init failed')
  }

  return res.json()
}
