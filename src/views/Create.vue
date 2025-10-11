<script setup>
import { ref } from 'vue'
import StepChild from '@/components/steps/StepChild.vue'
import StepCustomer from '@/components/steps/StepCustomer.vue'
import StepFootball from '@/components/steps/StepFootball.vue'
import StepReview from '@/components/steps/StepReview.vue'
import { useRouter } from 'vue-router'
import { createBook } from '@/lib/firebase'

const steps = ['child', 'customer', 'football', 'review']
const currentStep = ref(0)
const router = useRouter()

// Zentrale Formdaten, die in allen Steps gefüllt werden
const form = ref({
  child: { name: '', age: null },
  club: '',
  language: 'de',
  email: '',
  storyIdea: ''
})

function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}

async function submitForm() {
  try {
    const id = await createBook(form.value)
    router.push({ name: 'status', params: { id } })
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
    alert('Beim Speichern ist ein Fehler aufgetreten.')
  }
}
</script>

<template>
  <section class="create-container max-w-xl mx-auto py-6">
    <h1 class="text-2xl font-bold mb-4 text-center">Deine Fußballgeschichte</h1>

    <div v-if="steps[currentStep] === 'child'">
      <StepChild v-model="form.child" />
      <div class="flex justify-end mt-4">
        <button @click="nextStep" class="btn-primary">Weiter</button>
      </div>
    </div>

    <div v-else-if="steps[currentStep] === 'customer'">
      <StepCustomer v-model="form.email" />
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="btn-secondary">Zurück</button>
        <button @click="nextStep" class="btn-primary">Weiter</button>
      </div>
    </div>

    <div v-else-if="steps[currentStep] === 'football'">
      <StepFootball v-model="form.club" />
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="btn-secondary">Zurück</button>
        <button @click="nextStep" class="btn-primary">Weiter</button>
      </div>
    </div>

    <div v-else-if="steps[currentStep] === 'review'">
      <StepReview :form="form" />
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="btn-secondary">Zurück</button>
        <button @click="submitForm" class="btn-primary">Absenden</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-primary {
  background-color: #00b86b;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
}
.btn-secondary {
  background-color: #ccc;
  color: black;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
}
</style>
