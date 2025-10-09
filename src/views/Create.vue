<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Deine Fußballgeschichte</h1>

    <div class="flex justify-center mb-8">
      <template v-for="(st, i) in steps" :key="st.name">
        <div class="flex items-center">
          <div :class="[
                'rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold',
                i === step ? 'bg-[#00B86B] text-white' : 'bg-gray-300 text-gray-700'
              ]">{{ i + 1 }}</div>
          <span v-if="i < steps.length - 1" class="w-10 h-[2px] bg-gray-300 mx-2"></span>
        </div>
      </template>
    </div>

    <transition name="fade" mode="out-in">
      <div key="step" class="bg-white shadow-md rounded-2xl p-6">
        <component :is="steps[step].component" />
      </div>
    </transition>

    <div class="flex justify-between mt-6">
      <button @click="back" :disabled="step === 0"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40">
        Zurück
      </button>
      <button @click="next"
        class="px-6 py-2 rounded-lg bg-[#00B86B] text-white font-semibold hover:bg-green-700">
        {{ step === steps.length - 1 ? 'Fertig' : 'Weiter' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
