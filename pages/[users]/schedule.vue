<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">Schedule a Meeting</h1>

    <!-- Date Picker -->
    <div class="mb-4">
      <label for="date" class="block text-lg font-medium">Select a Date</label>
      <input type="date" id="date" class="border rounded-lg p-2 mt-2" v-model="selectedDate" @change="onDateChange" />
    </div>

    <!-- Slot Picker -->
    <div v-if="loading" class="mb-4 text-gray-500">Loading available slots...</div>
    <div v-else-if="availableSlots.length" class="mb-4">
      <label class="block text-lg font-medium">Available Time Slots</label>
      <div class="mt-2 flex flex-wrap gap-2">
        <button
          v-for="slot in availableSlots"
          :key="slot"
          @click="selectSlot(slot)"
          :class="{'bg-blue-500 text-white': selectedSlot === slot, 'bg-gray-200 text-black': selectedSlot !== slot}"
          class="p-2 rounded-lg"
        >
          {{ slot }}
        </button>
      </div>
    </div>
    <div v-else class="mb-4 text-red-500">No slots available for the selected date.</div>

    <!-- Booking Form -->
    <div v-if="availableSlots.length && selectedSlot" class="mt-6">
      <label class="block text-lg font-medium">Enter Your Details</label>
      <div class="mt-2 space-y-4">
        <input v-model="name" type="text" placeholder="Your Name" class="border rounded-lg p-2 w-full" />
        <input v-model="email" type="email" placeholder="Your Email" class="border rounded-lg p-2 w-full" />
        <textarea v-model="message" placeholder="Your Message" class="border rounded-lg p-2 w-full" rows="4"></textarea>
        <button @click="submitBooking" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useIndexedDB } from '~/composables/useIndexedDB';

const selectedDate = ref<string | null>(null);
const selectedSlot = ref<string | null>(null);
const availableSlots = ref<string[]>([]);
const loading = ref<boolean>(true);
const name = ref<string>('');
const email = ref<string>('');
const message = ref<string>('');

// const route = useRoute();
// const { getAvailability } = await useIndexedDB();

// function sanitizeUsername(email: string): string {
//   return email.replace(/[@.]/g, '-');
// }

// Automatically select today's date when the page loads
onMounted(() => {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  selectedDate.value = today;
  loadSlots();
});

async function onDateChange(event: Event) {
  const input = event.target as HTMLInputElement;
  selectedDate.value = input.value;
  console.log("Selected Date:", selectedDate.value);
  await loadSlots();
}

async function loadSlots() {
  loading.value = true;

  if (!selectedDate.value) {
    console.log("No date selected");
    loading.value = false;
    return;
  }

  // Default availability
  const defaultAvailability = {
    enabled: true,
    from: '09:00',
    to: '17:00'
  };

  const dayOfWeek = new Date(selectedDate.value).toLocaleString('en-US', { weekday: 'long' });

  // Use default availability for all days
  const fromTime = defaultAvailability.from;
  const toTime = defaultAvailability.to;

  // Generate hourly slots based on fromTime and toTime
  availableSlots.value = generateTimeSlots(fromTime, toTime);

  loading.value = false; // End loading
}

function generateTimeSlots(from: string, to: string) {
  const slots: string[] = [];
  let currentTime = from;

  while (currentTime < to) {
    slots.push(currentTime);
    // Assuming slots are hourly for simplicity;
    const [hours, minutes] = currentTime.split(':').map(Number);
    const nextHour = (hours + 1).toString().padStart(2, '0');
    currentTime = `${nextHour}:${minutes.toString().padStart(2, '0')}`;
  }

  return slots;
}

function selectSlot(slot: string) {
  selectedSlot.value = slot;
}

function submitBooking() {
  if (name.value && email.value && message.value && selectedSlot.value && selectedDate.value) {
    console.log('Booking Success:', {
      name: name.value,
      email: email.value,
      message: message.value,
      date: selectedDate.value,
      slot: selectedSlot.value,
    });
    alert('Booking Successful!');
    // Reset form
    name.value = '';
    email.value = '';
    message.value = '';
    selectedSlot.value = null;
    selectedDate.value = null;
    availableSlots.value = [];
  } else {
    alert('Please fill in all the details.');
  }
}

definePageMeta({
  auth: false,
  layout: 'guest',
})
</script>