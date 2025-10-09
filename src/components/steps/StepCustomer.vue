<script setup>
import { useFormStore } from '@/stores/form'
const s = useFormStore()
</script>

<template>
  <div class="grid gap-4">
    <div>
      <label class="block text-sm mb-1">Vollständiger Name</label>
      <input v-model="s.customer.fullName" class="w-full border rounded px-3 py-2" />
    </div>
    <div>
      <label class="block text-sm mb-1">E-Mail-Adresse</label>
      <input v-model="s.customer.email" type="email" class="w-full border rounded px-3 py-2" />
    </div>
    <div class="flex items-center gap-2">
      <input id="consent" type="checkbox" v-model="s.customer.consent" class="w-4 h-4" />
      <label for="consent" class="text-sm">Ich willige in die Verarbeitung meiner Daten ein.</label>
    </div>
  </div>
</template>
