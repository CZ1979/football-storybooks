<script setup>
import { useFormStore } from '@/stores/form'
const s = useFormStore()
</script>

<template>
  <div class="grid gap-4">
    <div>
      <label class="block text-sm mb-1">Name des Kindes</label>
      <input v-model="s.child.name" class="w-full border rounded px-3 py-2" />
    </div>
    <div>
      <label class="block text-sm mb-1">Alter</label>
      <input v-model.number="s.child.age" type="number" class="w-full border rounded px-3 py-2" />
    </div>
    <div>
      <label class="block text-sm mb-1">Verein</label>
      <input v-model="s.child.club" class="w-full border rounded px-3 py-2" />
    </div>
    <div>
      <label class="block text-sm mb-1">Position</label>
      <select v-model="s.child.position" class="w-full border rounded px-3 py-2">
        <option value="">Bitte wählen</option>
        <option>Torwart</option>
        <option>Abwehr</option>
        <option>Mittelfeld</option>
        <option>Sturm</option>
      </select>
    </div>
  </div>
</template>
