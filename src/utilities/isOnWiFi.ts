interface NavigatorConnection {
  connection?: {
    type: string
  }
}

declare global {
  interface Navigator extends NavigatorConnection {}
}

export default function isOnWiFi(): boolean {
  if ('connection' in navigator && navigator.connection && navigator.onLine) {
    return navigator.connection?.type !== 'cellular'
  }

  return false
}
