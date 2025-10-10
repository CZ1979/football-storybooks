<script setup>
import { ref } from 'vue'
import { useFormStore } from '@/stores/form'

// Komponenten der einzelnen Steps importieren
import StepCustomer from '@/components/steps/StepCustomer.vue'
import StepChild from '@/components/steps/StepChild.vue'
import StepFootball from '@/components/steps/StepFootball.vue'
import StepReview from '@/components/steps/StepReview.vue'

// Reaktive Variablen
const step = ref(0)
const s = useFormStore()

// Alle Formular-Schritte definieren
const steps = [
  { name: 'Kontakt', component: StepCustomer },
  { name: 'Kind', component: StepChild },
  { name: 'Fußball', component: StepFootball },
  { name: 'Review', component: StepReview },
]

// Navigation
function next() {
  if (step.value < steps.length - 1) step.value++
}
function back() {
  if (step.value > 0) step.value--
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <!-- Fortschrittsanzeige -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-600">
          Schritt {{ step + 1 }} von {{ steps.length }}
        </span>
        <span class="text-sm font-semibold text-[#00B86B]">
          {{ steps[step].name }}
        </span>
      </div>
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-green-600 transition-all duration-500"
          :style="{ width: ((step + 1) / steps.length) * 100 + '%' }"
        ></div>
      </div>
    </div>

    <!-- Überschrift -->
  <h1 class="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Deine Fußballgeschichte</h1>

    <!-- Step-Navigation -->
  <div class="flex justify-center mb-8 px-2">
      <template v-if="steps && steps.length">
        <div v-for="(st, i) in steps" :key="st.name" class="flex items-center">
          <div
            :class="[
              'rounded-full w-9 h-9 flex items-center justify-center text-sm font-semibold transition-colors duration-300 shadow-sm',
              i === step
                ? 'bg-green-600 text-white'
                : i < step
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-300 text-gray-700'
            ]"
          >
            {{ i + 1 }}
          </div>
          <span
            v-if="i < steps.length - 1"
            class="w-10 h-[2px] bg-gray-300 mx-2"
          ></span>
        </div>
      </template>
    </div>

    <!-- Step Content -->
    <transition name="fade" mode="out-in">
      <div
        v-if="steps && steps[step]"
        :key="step"
        class="bg-white dark:bg-gray-900 shadow-lg rounded-3xl p-6 sm:p-8"
      >
        <component :is="steps[step].component" />
      </div>
    </transition>

    <!-- Navigation Buttons -->
    <div class="flex justify-between mt-6" v-if="steps && steps.length">
      <button
        @click="back"
        :disabled="step === 0"
        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition-transform transform hover:-translate-y-0.5"
      >
        Zurück
      </button>

      <button
        @click="next"
        class="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition transform hover:scale-105"
      >
        {{ step === steps.length - 1 ? 'Fertig' : 'Weiter' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

