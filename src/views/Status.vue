<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const route = useRoute()
const bookId = route.params.id
const book = ref(null)
const loading = ref(true)

onMounted(() => {
  const refDoc = doc(db, 'books', bookId)
  onSnapshot(refDoc, (snap) => {
    if (snap.exists()) {
      book.value = snap.data()
    } else {
      book.value = null
    }
    loading.value = false
  })
})
</script>

<template>
  <section class="status-page">
    <h1 class="text-2xl font-bold mb-4">Status deiner Geschichte</h1>

    <div v-if="loading">Lade Daten ...</div>

    <div v-else-if="!book">
      <p>Kein Buch gefunden. Bitte überprüfe den Link.</p>
    </div>

    <div v-else>
      <p><strong>Status:</strong> {{ book.status }}</p>

      <div v-if="book.status === 'ready_for_story'" class="mt-2 text-yellow-600">
        Deine Geschichte wird gerade vorbereitet …
      </div>

      <div v-if="book.status === 'story_generating'" class="mt-2 text-blue-600">
        Die KI schreibt gerade deine Geschichte …
      </div>

      <div v-if="book.status === 'story_ready'" class="mt-2">
        <h2 class="text-xl font-semibold mb-2">Deine Geschichte</h2>
        <pre class="whitespace-pre-wrap bg-gray-100 p-4 rounded">{{ book.storyText }}</pre>
      </div>

      <div v-if="book.status === 'error'" class="text-red-600 mt-2">
        <strong>Fehler:</strong> {{ book.lastError }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.status-page {
  max-width: 700px;
  margin: 2rem auto;
}
pre {
  white-space: pre-wrap;
  font-family: inherit;
}
</style>
