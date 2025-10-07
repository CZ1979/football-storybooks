<script setup>
import { computed } from 'vue'
import { useFormStore } from '@/stores/form'

const s = useFormStore()

const teammates = computed(() => s.child.teammates.join(', '))
const rivals = computed(() => s.child.rivals.join(', '))
const strengths = computed(() => s.child.traits.strengths.join(', '))
</script>

<template>
  <div class="space-y-5">
    <section class="rounded border p-4 bg-gray-50">
      <h2 class="font-semibold mb-2">Kontaktdaten</h2>
      <p>{{ s.customer.fullName }} · {{ s.customer.email }}</p>
      <p class="text-sm text-gray-600">
        Einwilligung: {{ s.customer.consent ? 'erteilt' : 'fehlt noch' }}
      </p>
    </section>

    <section class="rounded border p-4 bg-gray-50">
      <h2 class="font-semibold mb-2">Kind & Team</h2>
      <ul class="space-y-1 text-sm">
        <li><strong>Name:</strong> {{ s.child.name }} ({{ s.child.age }} Jahre)</li>
        <li><strong>Verein/Position:</strong> {{ s.child.club || '–' }} / {{ s.child.position || '–' }}</li>
        <li><strong>Bester Freund:</strong> {{ s.child.bestFriend || '–' }}</li>
        <li><strong>Teamkollegen:</strong> {{ teammates || '–' }}</li>
        <li><strong>Rivalen:</strong> {{ rivals || '–' }}</li>
        <li>
          <strong>Appearance:</strong>
          {{ s.child.appearance.hairColor || '–' }},
          {{ s.child.appearance.hairLength || '–' }},
          {{ s.child.appearance.hairStyle || '–' }},
          Haut: {{ s.child.appearance.skinTone || '–' }},
          Augen: {{ s.child.appearance.eyeColor || '–' }}
        </li>
        <li><strong>Stärken:</strong> {{ strengths || '–' }}</li>
      </ul>
    </section>

    <section class="rounded border p-4 bg-gray-50">
      <h2 class="font-semibold mb-2">Geschichten-Setup</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm mb-1">Ton</label>
          <input v-model="s.storyOptions.tone" class="w-full px-3 py-2 rounded border" />
        </div>
        <div>
          <label class="block text-sm mb-1">Kapitel</label>
          <input
            v-model.number="s.storyOptions.chapters"
            type="number"
            min="3"
            class="w-full px-3 py-2 rounded border"
          />
        </div>
        <div>
          <label class="block text-sm mb-1">Länge</label>
          <input v-model="s.storyOptions.length" class="w-full px-3 py-2 rounded border" />
        </div>
      </div>
    </section>

    <section class="rounded border p-4 bg-gray-50">
      <h2 class="font-semibold mb-2">Preis</h2>
      <div class="flex gap-3 items-center">
        <input
          v-model.number="s.price"
          type="number"
          min="0"
          step="0.1"
          class="w-32 px-3 py-2 rounded border"
        />
        <input v-model="s.currency" class="w-24 px-3 py-2 rounded border uppercase" />
      </div>
    </section>
  </div>
</template>
