export {}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string
        ready: () => void
        close: () => void
        expand: () => void
      }
    }
  }
}
