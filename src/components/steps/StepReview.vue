<script setup>
import { useFormStore } from '@/stores/form'
import { useRouter } from 'vue-router'
const store = useFormStore()
const router = useRouter()

async function submit() {
  const id = await store.finalize()
  router.push({ name: 'status', params: { formId: id } })

}
</script>

<template>
  <div class="step">
    <h2 class="text-xl font-bold mb-3">Zusammenfassung</h2>

    <div class="bg-gray-100 p-4 rounded mb-4">
      <p><strong>Eltern:</strong> {{ store.customer.name }} ({{ store.customer.email }})</p>
      <p><strong>Kind:</strong> {{ store.child.name }} ({{ store.child.age }} Jahre)</p>
      <p><strong>Merkmale:</strong> {{ store.child.hairColor }}, {{ store.child.skinColor }}, {{ store.child.eyeColor }}</p>
      <p><strong>Verein:</strong> {{ store.club }} | Position: {{ store.position }}</p>
      <p><strong>Mitspieler:</strong> {{ store.teammates }}</p>
      <p><strong>Rivalen:</strong> {{ store.rivalClubs }}</p>
    </div>

    <button @click="submit" class="btn">Absenden & Geschichte starten</button>
  </div>
</template>

<style scoped>
.step { max-width:500px; margin:0 auto; }
.btn { background:#00b86b; color:#fff; padding:0.6rem 1.5rem; border-radius:0.5rem; }
</style>
