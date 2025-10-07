<script setup>
import { ref, computed } from 'vue'
import { useFormStore } from '@/stores/form'
import { createOrUpdateForm } from '@/lib/firebase'
import StepCustomer from '@/components/steps/StepCustomer.vue'
import StepChild from '@/components/steps/StepChild.vue'
import StepFootball from '@/components/steps/StepFootball.vue'
import StepReview from '@/components/steps/StepReview.vue'

const s = useFormStore()
const step = ref(0)
const steps = [
  { name: 'Kontakt' }, { name: 'Kind' }, { name: 'Fußball' }, { name: 'Review & Bezahlen' }
]
const canNext = computed(() => true) // TODO: Validierungen

async function next() {
  if (step.value < steps.length - 1) step.value++
  s.formId = await createOrUpdateForm(s.formId, { ...s.$state })
}
async function prev() { if (step.value > 0) step.value-- }
</script>

<template>
  <div class="space-y-6">
    <ol class="flex gap-2">
      <li v-for="(st, i) in steps" :key="st.name"
          class="px-3 py-1 rounded-full text-sm"
          :class="i===step ? 'bg-black text-white' : 'bg-gray-200'">
        {{ i+1 }}. {{ st.name }}
      </li>
    </ol>

    <div class="rounded-xl bg-white shadow p-6">
      <component :is="[StepCustomer, StepChild, StepFootball, StepReview][step]" />
      <div class="mt-6 flex justify-between">
        <button class="px-4 py-2 rounded bg-gray-200" @click="prev" :disabled="step===0">Zurück</button>
        <button class="px-4 py-2 rounded bg-black text-white" @click="next" :disabled="!canNext">
          {{ step === steps.length -1 ? 'Speichern' : 'Weiter' }}
        </button>
      </div>
    </div>
  </div>
</template>
