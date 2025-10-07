<script setup>
import { useFormStore } from '@/stores/form'
const s = useFormStore()
</script>

<template>
  <div class="grid md:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm mb-1">Vollständiger Name</label>
      <input v-model="s.customer.fullName" class="w-full px-3 py-2 rounded border" placeholder="Anna Mustermann" />
    </div>
    <div>
      <label class="block text-sm mb-1">E-Mail</label>
      <input v-model="s.customer.email" type="email" class="w-full px-3 py-2 rounded border" placeholder="anna@mail.de" />
    </div>
    <div class="md:col-span-2 flex items-center gap-2 mt-2">
      <input id="consent" type="checkbox" v-model="s.customer.consent" class="w-4 h-4" />
      <label for="consent" class="text-sm">Ich willige in die Verarbeitung zur Erstellung & Druck des Buches ein.</label>
    </div>
  </div>
</template>
