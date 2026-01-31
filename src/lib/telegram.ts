export const tg = window.Telegram?.WebApp ?? {
  initData: '',
  ready: () => {},
  close: () => {},
  expand: () => {}
}

export const initData = tg.initData