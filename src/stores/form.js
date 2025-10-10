import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { createOrUpdateForm } from '@/lib/firebase'

// debounce helper
let saveTimeout

export const useFormStore = defineStore('form', () => {
  const formId = ref(null)
  const customer = ref({ fullName: '', email: '', consent: false })
  const child = ref({
    name: '',
    age: '',
    club: '',
    position: '',
    teammates: [],
    rivals: [],
    traits: { strengths: [] },
  })
  const status = ref('draft')

  // alles beobachten
  watch(
    () => ({ customer: customer.value, child: child.value, status: status.value }),
    async (state) => {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(async () => {
        try {
          const id = await createOrUpdateForm(formId.value, {
            customer: state.customer,
            child: state.child,
            status: state.status,
          })
          formId.value = id
          console.log('✅ Autosave erfolgreich:', id)
        } catch (err) {
          console.warn('Autosave fehlgeschlagen', err)
        }
      }, 1000) // 1 s warten nach letzter Änderung
    },
    { deep: true }
  )

  return { formId, customer, child, status }
})
