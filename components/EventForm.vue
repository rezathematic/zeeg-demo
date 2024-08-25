<template>
    <form class="space-y-4" @submit.prevent="submitForm" >
      <div>
        <label class="block font-semibold">Name</label>
        <input class="border rounded-lg w-full p-2" v-model="form.name" type="text" required />
      </div>
      <div>
        <label class="block font-semibold">Email</label>
        <input class="border rounded-lg w-full p-2" v-model="form.email" type="email"  required />
      </div>
      <div>
        <label class="block font-semibold">Message</label>
        <textarea class="border rounded-lg w-full p-2" v-model="form.message"  rows="4"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
    </form>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const form = reactive({
    name: '',
    email: '',
    message: ''
  });
  
  const submitForm = () => {
    console.log(form);
  };
  </script>