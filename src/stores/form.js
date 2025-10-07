import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => ({
    customer: { fullName: '', email: '', consent: false },
    child: {
      name: '', age: 10, club: '', position: '',
      teammates: [], rivals: [], bestFriend: '',
      appearance: { hairColor:'', hairLength:'', hairStyle:'', skinTone:'', eyeColor:'' },
      traits: { strengths: [] },
    },
    storyOptions: { tone:'abenteuerlich', chapters:6, length:'medium' },
    price: 29.90, currency: 'EUR',
    formId: null,
  }),
})
