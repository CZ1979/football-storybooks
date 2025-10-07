<script setup>
import { useFormStore } from '@/stores/form'

const s = useFormStore()

const toneOptions = [
  { label: 'Abenteuerlich', value: 'abenteuerlich' },
  { label: 'Humorvoll', value: 'humorvoll' },
  { label: 'Motivierend', value: 'motivierend' },
]

const lengthOptions = [
  { label: 'Kurz', value: 'short' },
  { label: 'Mittel', value: 'medium' },
  { label: 'Lang', value: 'long' },
]
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div>
      <label class="block text-sm mb-1">Ton der Geschichte</label>
      <select v-model="s.storyOptions.tone" class="w-full px-3 py-2 rounded border">
        <option v-for="tone in toneOptions" :key="tone.value" :value="tone.value">
          {{ tone.label }}
        </option>
      </select>
    </div>
    <div>
      <label class="block text-sm mb-1">Anzahl Kapitel</label>
      <input
        v-model.number="s.storyOptions.chapters"
        type="number"
        min="3"
        max="12"
        class="w-full px-3 py-2 rounded border"
      />
    </div>
    <div class="md:col-span-2">
      <label class="block text-sm mb-1">Geschichtenlänge</label>
      <div class="flex gap-3">
        <label
          v-for="opt in lengthOptions"
          :key="opt.value"
          class="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer"
        >
          <input type="radio" :value="opt.value" v-model="s.storyOptions.length" />
          <span>{{ opt.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
