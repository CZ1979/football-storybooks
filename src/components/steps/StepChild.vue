<script setup>
import { computed } from 'vue'
import { useFormStore } from '@/stores/form'

const s = useFormStore()

const teammatesInput = computed({
  get: () => s.child.teammates.join(', '),
  set: (val) => {
    s.child.teammates = val
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  },
})

const rivalsInput = computed({
  get: () => s.child.rivals.join(', '),
  set: (val) => {
    s.child.rivals = val
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  },
})

const strengthsInput = computed({
  get: () => s.child.traits.strengths.join(', '),
  set: (val) => {
    s.child.traits.strengths = val
      .split(',')
      .map((trait) => trait.trim())
      .filter(Boolean)
  },
})
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div>
      <label class="block text-sm mb-1">Name des Kindes</label>
      <input
        v-model="s.child.name"
        class="w-full px-3 py-2 rounded border"
        placeholder="Max Mustermann"
      />
    </div>
    <div>
      <label class="block text-sm mb-1">Alter</label>
      <input
        v-model.number="s.child.age"
        type="number"
        min="4"
        class="w-full px-3 py-2 rounded border"
        placeholder="10"
      />
    </div>
    <div>
      <label class="block text-sm mb-1">Verein</label>
      <input
        v-model="s.child.club"
        class="w-full px-3 py-2 rounded border"
        placeholder="FC Musterstadt"
      />
    </div>
    <div>
      <label class="block text-sm mb-1">Position</label>
      <input
        v-model="s.child.position"
        class="w-full px-3 py-2 rounded border"
        placeholder="Stürmer"
      />
    </div>
    <div class="md:col-span-2">
      <label class="block text-sm mb-1">Bester Freund / Beste Freundin</label>
      <input
        v-model="s.child.bestFriend"
        class="w-full px-3 py-2 rounded border"
        placeholder="Lena"
      />
    </div>
    <div class="md:col-span-2">
      <label class="block text-sm mb-1">Teamkollegen (Kommagetrennt)</label>
      <textarea
        v-model="teammatesInput"
        rows="2"
        class="w-full px-3 py-2 rounded border"
        placeholder="Lena, Tom, Sam"
      />
    </div>
    <div class="md:col-span-2">
      <label class="block text-sm mb-1">Rivalen (Kommagetrennt)</label>
      <textarea
        v-model="rivalsInput"
        rows="2"
        class="w-full px-3 py-2 rounded border"
        placeholder="FC Rivalstadt, ..."
      />
    </div>
    <div class="md:col-span-2 grid gap-4 md:grid-cols-5">
      <div>
        <label class="block text-sm mb-1">Haarfarbe</label>
        <input
          v-model="s.child.appearance.hairColor"
          class="w-full px-3 py-2 rounded border"
          placeholder="Braun"
        />
      </div>
      <div>
        <label class="block text-sm mb-1">Haarlänge</label>
        <input
          v-model="s.child.appearance.hairLength"
          class="w-full px-3 py-2 rounded border"
          placeholder="Kurz"
        />
      </div>
      <div>
        <label class="block text-sm mb-1">Frisur</label>
        <input
          v-model="s.child.appearance.hairStyle"
          class="w-full px-3 py-2 rounded border"
          placeholder="Lockig"
        />
      </div>
      <div>
        <label class="block text-sm mb-1">Hauttyp</label>
        <input
          v-model="s.child.appearance.skinTone"
          class="w-full px-3 py-2 rounded border"
          placeholder="Hell"
        />
      </div>
      <div>
        <label class="block text-sm mb-1">Augenfarbe</label>
        <input
          v-model="s.child.appearance.eyeColor"
          class="w-full px-3 py-2 rounded border"
          placeholder="Grün"
        />
      </div>
    </div>
    <div class="md:col-span-2">
      <label class="block text-sm mb-1">Stärken (Kommagetrennt)</label>
      <textarea
        v-model="strengthsInput"
        rows="2"
        class="w-full px-3 py-2 rounded border"
        placeholder="Schnell, fair, teamfähig"
      />
    </div>
  </div>
</template>
