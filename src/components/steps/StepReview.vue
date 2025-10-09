<script setup>
import { useFormStore } from '@/stores/form'
import { createOrUpdateForm } from '@/lib/firebase'
const s = useFormStore()
const message = ref('')

async function simulateSave() {
  const id = await createOrUpdateForm(s.formId, { ...s.$state, status: 'draft' })
  message.value = `Formular gespeichert (ID: ${id})`
}
</script>

<template>
  <div>
    <h3 class="font-semibold mb-3">Vorschau deiner Angaben</h3>
    <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">{{ s.$state }}</pre>
    <button @click="simulateSave"
            class="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg">
      Testweise speichern
    </button>
    <p v-if="message" class="mt-3 text-green-700">{{ message }}</p>
  </div>
</template>
