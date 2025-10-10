<script setup>
import { useFormStore } from '@/stores/form'
const s = useFormStore()
</script>

<template>
  <div class="grid gap-4">
    <div>
      <label class="block text-sm mb-1">Mitspieler (Kommagetrennt)</label>
      <input v-model="s.child.teammatesString" placeholder="Leo, Tim, Jonas" class="form-input" />
    </div>
    <div>
      <label class="block text-sm mb-1">Rivalen</label>
      <input v-model="s.child.rivalsString" placeholder="FC Langen" class="form-input" />
    </div>
    <div>
      <label class="block text-sm mb-1">Stärken</label>
      <input v-model="s.child.traitsString" placeholder="Torschuss, Übersicht" class="form-input" />
    </div>
  </div>
</template>
