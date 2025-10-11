<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const route = useRoute()
const formId = route.params.formId
const book = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  if (!formId) {
    error.value = 'Kein Buch gefunden (ungültige ID).'
    loading.value = false
    return
  }

  try {
    const refDoc = doc(db, 'books', formId)
    onSnapshot(
      refDoc,
      (snap) => {
        if (snap.exists()) {
          book.value = snap.data()
        } else {
          error.value = 'Buch nicht gefunden.'
        }
        loading.value = false
      },
      (err) => {
        error.value = err.message
        loading.value = false
      }
    )
  } catch (err) {
    error.value = err.message
    loading.value = false
  }
})
</script>

<template>
  <section class="status-page">
    <h1 class="text-2xl font-bold mb-4">Status deiner Geschichte</h1>

    <div v-if="loading">⏳ Lade Daten...</div>

    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else-if="book">
      <p><strong>Eltern:</strong> {{ book.customer?.name }} ({{ book.customer?.email }})</p>
      <p><strong>Kind:</strong> {{ book.child?.name }} ({{ book.child?.age }} Jahre)</p>
      <p><strong>Merkmale:</strong> {{ book.child?.hairColor }}, {{ book.child?.skinColor }}, {{ book.child?.eyeColor }}</p>
      <p><strong>Verein:</strong> {{ book.club }} | Position: {{ book.position }}</p>
      <p><strong>Mitspieler:</strong> {{ book.teammates?.join(', ') }}</p>
      <p><strong>Rivalen:</strong> {{ book.rivalClubs?.join(', ') }}</p>

      <div class="mt-4">
        <p><strong>Status:</strong> {{ book.status }}</p>

        <div v-if="book.status === 'ready_for_story'" class="mt-2 text-green-700">
          <h2 class="text-xl font-semibold mb-2">Deine Geschichte ist fertig!</h2>
          <pre class="story">{{ book.storyText || '(Noch kein Text vorhanden)' }}</pre>
        </div>

        <div v-else-if="book.status === 'story_generating'" class="text-blue-600 mt-2">
          Die KI schreibt gerade deine Geschichte …
        </div>

        <div v-else-if="book.status === 'draft'" class="text-gray-600 mt-2">
          Entwurf gespeichert, aber noch nicht abgesendet.
        </div>

        <div v-else-if="book.status === 'ready_for_story'" class="text-yellow-600 mt-2">
          Geschichte wird vorbereitet …
        </div>

        <div v-else-if="book.status === 'error'" class="text-red-600 mt-2">
          Fehler: {{ book.lastError }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.status-page {
  max-width: 700px;
  margin: 2rem auto;
  line-height: 1.5;
}
.story {
  white-space: pre-wrap;
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}
</style>
