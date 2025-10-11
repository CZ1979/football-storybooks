import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { upsertBookDraft, markBookReady } from '@/lib/firebase'

let saveTimeout

export const useFormStore = defineStore('form', () => {
  const bookId = ref(null)

  const customer = ref({ name: '', email: '', consent: false })
  const child = ref({
    name: '',
    age: '',
    hairColor: '',
    skinColor: '',
    eyeColor: '',
  })
  const club = ref('')
  const position = ref('')
  const teammates = ref('')
  const rivalClubs = ref('')
  const language = ref('de')
  const storyIdea = ref('')
  const status = ref('draft')

  watch(
    () => ({
      customer: customer.value,
      child: child.value,
      club: club.value,
      position: position.value,
      teammates: teammates.value,
      rivalClubs: rivalClubs.value,
      language: language.value,
      storyIdea: storyIdea.value,
      status: status.value,
    }),
    (state) => {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(async () => {
        try {
          const id = await upsertBookDraft(bookId.value, {
            ...state,
            teammates: splitList(state.teammates),
            rivalClubs: splitList(state.rivalClubs),
          })
          bookId.value = id
        } catch (err) {
          console.warn('Autosave fehlgeschlagen', err)
        }
      }, 1000)
    },
    { deep: true }
  )

  async function finalize() {
    if (!bookId.value) {
      throw new Error('Kein Book-Draft vorhanden')
    }
    await markBookReady(bookId.value)
    status.value = 'ready_for_story'
    return bookId.value
  }

  return {
    bookId,
    customer,
    child,
    club,
    position,
    teammates,
    rivalClubs,
    language,
    storyIdea,
    status,
    finalize,
  }
})

function splitList(val) {
  if (!val) return []
  return val
    .split(',')
    .map((x) => x.trim())
    .filter((x) => x.length)
}
