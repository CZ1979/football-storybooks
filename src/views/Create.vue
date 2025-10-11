<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createBook } from '@/lib/firebase'

// reactive Formdaten (werden aus Steps gefüllt)
const form = ref({
  child: { name: '', age: null },
  club: '',
  language: 'de',
  email: '',
  storyIdea: '',
  title: ''
})

const loading = ref(false)
const router = useRouter()

async function handleSubmit() {
  try {
    loading.value = true

    // createBook schreibt direkt in Firestore.books
    const id = await createBook({
      title: form.value.title,
      child: form.value.child,
      club: form.value.club,
      language: form.value.language,
      email: form.value.email,
      storyIdea: form.value.storyIdea
    })

    // Weiterleitung zur Status-Seite
    router.push({ name: 'status', params: { id } })
  } catch (err) {
    console.error('❌ Fehler beim Speichern:', err)
    alert('Fehler beim Speichern. Bitte versuche es erneut.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="create-page">
    <h1 class="text-2xl font-bold mb-4">Deine Fußballgeschichte erstellen</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block font-semibold">Name des Kindes</label>
        <input v-model="form.child.name" type="text" required class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block font-semibold">Alter</label>
        <input v-model="form.child.age" type="number" min="5" max="16" class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block font-semibold">Verein</label>
        <input v-model="form.club" type="text" placeholder="z. B. SKG Sprendlingen" class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block font-semibold">E-Mail</label>
        <input v-model="form.email" type="email" required class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block font-semibold">Sprachauswahl</label>
        <select v-model="form.language" class="border p-2 w-full rounded">
          <option value="de">Deutsch</option>
          <option value="en">Englisch</option>
        </select>
      </div>

      <div>
        <label class="block font-semibold">Idee oder Wunsch</label>
        <textarea
          v-model="form.storyIdea"
          placeholder="z. B. Maxi schießt das entscheidende Tor im Finale"
          class="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        {{ loading ? 'Wird gespeichert …' : 'Geschichte starten' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.create-page {
  max-width: 600px;
  margin: 2rem auto;
}
</style>
