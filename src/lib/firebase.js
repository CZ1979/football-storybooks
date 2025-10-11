import { initializeApp, getApp, getApps } from 'firebase/app'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

console.log('[Firebase Project]', import.meta.env.VITE_FIREBASE_PROJECT_ID)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)

/** direktes Anlegen eines neuen Buchs (falls du ohne Draft arbeitest) */
export async function createBook(payload) {
  const id = crypto.randomUUID()
  const data = mapBookPayload(payload)
  data.status = 'ready_for_story'
  await setDoc(doc(db, 'books', id), data)
  return id
}

/** Draft-Speicherung */
export async function upsertBookDraft(id, payload) {
  const bookId = id || crypto.randomUUID()
  const ref = doc(db, 'books', bookId)
  const mapped = mapBookPayload(payload)
  if (!id) {
    await setDoc(ref, { ...mapped, status: payload.status || 'draft' })
  } else {
    await setDoc(ref, mapped, { merge: true })
  }
  return bookId
}

/** Finalisierung */
export async function markBookReady(bookId) {
  const ref = doc(db, 'books', bookId)
  await updateDoc(ref, {
    status: 'ready_for_story',
    updatedAt: serverTimestamp(),
  })
}

/** Lesen */
export async function readBook(bookId) {
  const snap = await getDoc(doc(db, 'books', bookId))
  return snap.exists() ? snap.data() : null
}

/** internes Mapping */
function mapBookPayload(payload) {
  return {
    customer: {
      name: payload.customer?.name || '',
      email: payload.customer?.email || '',
    },
    child: {
      name: payload.child?.name || '',
      age: payload.child?.age || null,
      hairColor: payload.child?.hairColor || '',
      skinColor: payload.child?.skinColor || '',
      eyeColor: payload.child?.eyeColor || '',
    },
    club: payload.club || payload.child?.club || '',
    position: payload.position || '',
    teammates: payload.teammates || [],
    rivalClubs: payload.rivalClubs || [],
    language: payload.language || 'de',
    storyIdea: payload.storyIdea || '',
    storyText: payload.storyText ?? null,
    lastError: payload.lastError ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
}
