import { defineStore } from 'pinia'

export const useAvailabilityStore = defineStore('availability', {
  state: () => ({
    daysOfWeek: [
      { name: 'Monday', available: false, timeFrom: '', timeTo: '' },
      { name: 'Tuesday', available: false, timeFrom: '', timeTo: '' },
      { name: 'Wednesday', available: false, timeFrom: '', timeTo: '' },
      { name: 'Thursday', available: false, timeFrom: '', timeTo: '' },
      { name: 'Friday', available: false, timeFrom: '', timeTo: '' },
      { name: 'Saturday', available: false, timeFrom: '', timeTo: '' },
      { name: 'Sunday', available: false, timeFrom: '', timeTo: '' }
    ]
  }),
  actions: {
    setAvailability(availability: any) {
      this.daysOfWeek = availability
    }
  }
})
