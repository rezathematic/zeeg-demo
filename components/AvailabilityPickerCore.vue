<template>
  <div class="space-y-4">
    <div v-for="day in daysOfWeek" :key="day" class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <input type="checkbox" v-model="availability[day].enabled" @change="toggleAvailability(day)" />
        <span class="font-semibold">{{ day }}</span>
      </div>
      <div class="flex space-x-2" v-if="availability[day].enabled">
        <input type="time" v-model="availability[day].from" class="border rounded-lg p-2" />
        <input type="time" v-model="availability[day].to" class="border rounded-lg p-2" />
      </div>
      <button v-if="availability[day].enabled" @click="copyTime(day)" class="text-blue-500 hover:underline">Copy</button>
    </div>
    <div class="mt-6">
      <button @click="applyCopiedTime" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Apply Copied Time to All Days</button>
    </div>
    <div class="mt-6">
      <button @click="saveAvailabilityData" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Save Availability</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useIndexedDB } from '~/composables/useIndexedDB';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const availability = reactive({
  Monday: { enabled: false, from: '', to: '' },
  Tuesday: { enabled: false, from: '', to: '' },
  Wednesday: { enabled: false, from: '', to: '' },
  Thursday: { enabled: false, from: '', to: '' },
  Friday: { enabled: false, from: '', to: '' },
  Saturday: { enabled: false, from: '', to: '' },
  Sunday: { enabled: false, from: '', to: '' },
});

let copiedTime = { from: '', to: '' };

const { data } = useAuth();
const { saveAvailability, getAvailability, getUser } = await useIndexedDB();

function sanitizeUsername(email: string): string {
  return email.replace(/[@.]/g, '-');
}

onMounted(async () => {
  if (data.value?.user) {
    const sanitizedUsername = sanitizeUsername(data.value.user.email);
    const savedAvailability = await getAvailability(sanitizedUsername);
    if (savedAvailability) {
      Object.assign(availability, savedAvailability.availability);
    }
  }
});

function toggleAvailability(day: string) {
  if (!availability[day].enabled) {
    availability[day].from = '';
    availability[day].to = '';
  }
}

function copyTime(day: string) {
  copiedTime = { from: availability[day].from, to: availability[day].to };
  alert(`Copied time from ${day}`);
}

function applyCopiedTime() {
  daysOfWeek.forEach(day => {
    if (availability[day].enabled) {
      availability[day].from = copiedTime.from;
      availability[day].to = copiedTime.to;
    }
  });
}

async function saveAvailabilityData() {
  if (data.value?.user) {
    const sanitizedUsername = sanitizeUsername(data.value.user.email);
    const plainAvailability = JSON.parse(JSON.stringify(availability));
    await saveAvailability(sanitizedUsername, plainAvailability);
    alert('Availability saved successfully!');
  }
}
</script>