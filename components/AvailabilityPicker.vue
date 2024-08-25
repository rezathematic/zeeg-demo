<template>
  <div class="space-y-4">
    <div v-for="(day, index) in availabilityStore.daysOfWeek" :key="day.name" class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <input type="checkbox" v-model="day.available" @change="toggleAvailability(index)" />
        <span class="font-semibold">{{ day.name }}</span>
      </div>
      <div class="flex space-x-2" v-if="day.available">
        <input type="time" v-model="day.timeFrom" class="border rounded-lg p-2" />
        <input type="time" v-model="day.timeTo" class="border rounded-lg p-2" />
      </div>
      <button v-if="day.available" @click="copyTime(day)" class="text-blue-500 hover:underline">Copy</button>
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
import { onMounted, ref } from 'vue';
import { useAvailabilityStore } from '~/stores/availability';
import { useIndexedDB } from '~/composables/useIndexedDB';

const availabilityStore = useAvailabilityStore();
let copiedTime = ref({ timeFrom: '', timeTo: '' });

const { data } = useAuth();
const { saveAvailability, getAvailability } = await useIndexedDB();

function sanitizeUsername(email: string): string {
  return email.replace(/[@.]/g, '-');
}

onMounted(async () => {
  if (data.value?.user) {
    const sanitizedUsername = sanitizeUsername(data.value.user.email);
    const savedAvailability = await getAvailability(sanitizedUsername);
    if (savedAvailability) {
      availabilityStore.setAvailability(savedAvailability.availability);
    }
  }
});

function toggleAvailability(index: number) {
  const day = availabilityStore.daysOfWeek[index];
  if (!day.available) {
    day.timeFrom = '';
    day.timeTo = '';
  }
}

function copyTime(day: any) {
  copiedTime.value = { timeFrom: day.timeFrom, timeTo: day.timeTo };
  alert(`Copied time from ${day.name}`);
}

function applyCopiedTime() {
  availabilityStore.daysOfWeek.forEach(day => {
    if (day.available) {
      day.timeFrom = copiedTime.value.timeFrom;
      day.timeTo = copiedTime.value.timeTo;
    }
  });
}

async function saveAvailabilityData() {
  if (data.value?.user) {
    const sanitizedUsername = sanitizeUsername(data.value.user.email);
    await saveAvailability(sanitizedUsername, availabilityStore.daysOfWeek);
    alert('Availability saved successfully!');
  }
}
</script>
