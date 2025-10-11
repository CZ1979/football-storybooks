<script setup>
import { useFormStore } from '@/stores/form'
const store = useFormStore()
</script>

<template>
  <div class="step">
    <h2 class="text-xl font-bold mb-3">Infos zum Fußball</h2>

    <label class="block mb-2">Verein</label>
    <input v-model="store.club" class="input" placeholder="SKG Sprendlingen" />

    <label class="block mt-4 mb-2">Position</label>
    <input v-model="store.position" class="input" placeholder="Stürmer, Torwart …" />

    <label class="block mt-4 mb-2">Mitspieler (kommagetrennt)</label>
    <input v-model="store.teammates" class="input" placeholder="Tom, Ben, Leo" />

    <label class="block mt-4 mb-2">Rivalen-Vereine (kommagetrennt)</label>
    <input v-model="store.rivalClubs" class="input" placeholder="TSG Dreieich, Eintracht Frankfurt" />
  </div>
</template>

<style scoped>
.input { border:1px solid #ccc; border-radius:4px; padding:0.5rem; width:100%; }
.step { max-width:500px; margin:0 auto; }
</style>
