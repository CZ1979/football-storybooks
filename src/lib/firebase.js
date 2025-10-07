import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { getApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)

// einfache Helpers
export async function createOrUpdateForm(formId, payload) {
  const id = formId || crypto.randomUUID()
  await setDoc(doc(db, 'forms', id), {
    ...payload,
    updatedAt: serverTimestamp(),
    createdAt: payload.createdAt ?? serverTimestamp(),
    status: payload.status ?? 'draft',
    meta: { version: '1.0.0' }
  }, { merge: true })
  return id
}

export async function readForm(formId) {
  const snap = await getDoc(doc(db, 'forms', formId))
  return snap.exists() ? snap.data() : null
}
