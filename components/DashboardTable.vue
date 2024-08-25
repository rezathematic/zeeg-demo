<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 bg-gray-200 text-left">Name</th>
            <th class="py-2 px-4 bg-gray-200 text-left">Email</th>
            <th class="py-2 px-4 bg-gray-200 text-left">Date</th>
            <th class="py-2 px-4 bg-gray-200 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td class="py-2 px-4">{{ event.name }}</td>
            <td class="py-2 px-4">{{ event.email }}</td>
            <td class="py-2 px-4">{{ event.date }}</td>
            <td class="py-2 px-4">{{ event.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const events = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-08-25', time: '10:00 AM' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-08-26', time: '2:00 PM' },
    // Add data from API later
  ]);
  </script>