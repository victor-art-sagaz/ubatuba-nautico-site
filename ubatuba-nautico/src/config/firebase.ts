/**
 * Configuração WEB do Firebase (valores públicos do app, vindos de variáveis de ambiente).
 * Nunca coloque chaves de servidor/Admin SDK no frontend.
 * Sem as variáveis, o Firebase simplesmente não é carregado e a demonstração funciona normalmente.
 */

const env = import.meta.env

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
}

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId)
}

/** URL da Cloud Function que valida e grava reservas (opcional). */
export function getBookingApiUrl(): string | null {
  const url = ((env.VITE_BOOKING_API_URL as string | undefined) ?? '').trim()
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' ? parsed.toString() : null
  } catch {
    return null
  }
}

/**
 * Carrega o Firestore sob demanda (import dinâmico: não pesa no carregamento inicial).
 * Use para leituras públicas permitidas pelas regras (ex.: coleção "catalog").
 * Retorna null se o Firebase não estiver configurado.
 */
export async function getFirestoreDb() {
  if (!isFirebaseConfigured()) return null
  const [{ initializeApp, getApps, getApp }, { getFirestore }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore'),
  ])
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  return getFirestore(app)
}
