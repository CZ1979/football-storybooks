import { initializeApp, getApp, getApps } from 'firebase/app'
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
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

/**
 * 🔹 Erstellt ein neues Buch-Dokument in Firestore
 * Struktur ist kompatibel mit deinem KI/n8n Workflow
 */
export async function createBook(payload) {
  const id = crypto.randomUUID()
  await setDoc(doc(db, 'books', id), {
    title: payload.title || `${payload.child?.name || payload.name}'s Geschichte`,
    child: {
      name: payload.child?.name || payload.name || '',
      age: payload.child?.age || payload.age || null,
    },
    club: payload.club || '',
    language: payload.language || 'de',
    email: payload.email || '',
    storyIdea: payload.storyIdea || '',
    status: 'ready_for_story', // triggert automatisch die KI-Funktion
    storyText: null,
    lastError: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return id
}

/**
 * 🔹 Liest ein Buch-Dokument aus Firestore
 * Wird in Status.vue verwendet
 */
export async function readBook(bookId) {
  const snap = await getDoc(doc(db, 'books', bookId))
  return snap.exists() ? snap.data() : null
}
