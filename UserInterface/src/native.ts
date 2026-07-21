// 前端 ↔ C# 后端消息桥
// sendNative: 向 Photino 后端发送消息
// onNativeMessage: 注册特定消息类型的监听器

type NativeHandler = (payload: Record<string, unknown>) => void
const handlers = new Map<string, NativeHandler[]>()

export function sendNative(type: string, data?: Record<string, unknown>) {
  window.external.sendMessage(JSON.stringify({ type, ...data }))
}

export function onNativeMessage(type: string, handler: NativeHandler) {
  if (!handlers.has(type)) handlers.set(type, [])
  handlers.get(type)!.push(handler)
  return () => {
    const list = handlers.get(type)
    if (list) {
      const idx = list.indexOf(handler)
      if (idx !== -1) list.splice(idx, 1)
    }
  }
}

function dispatch(message: string) {
  console.log('[native] incoming:', message.length > 200 ? message.substring(0, 200) + '...' : message)
  try {
    const json = JSON.parse(message)
    const type = json.type as string | undefined
    if (type && handlers.has(type)) {
      const { type: _, ...payload } = json
      handlers.get(type)!.forEach(h => h(payload))
    }
  } catch { /* 忽略解析错误 */ }
}

// Windows: WebView2 — C# SendWebMessage → PostWebMessageAsString → chrome.webview message 事件
// 兜底：仅注册 receiveMessage（非 Windows 平台）。避免同时绑定两种机制导致双重分发。
const w: Record<string, unknown> = window as unknown as Record<string, unknown>
if (w.chrome && typeof w.chrome === 'object') {
  const c = w.chrome as Record<string, unknown>
  if (c.webview) {
    ;(c.webview as EventTarget).addEventListener('message', (e: Event) => {
      dispatch((e as MessageEvent).data as string)
    })
  }
} else {
  window.external.receiveMessage = dispatch
}
