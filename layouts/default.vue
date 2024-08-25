<template>
    <div>
      <!-- Global Navigation -->
      <nav class="bg-gray-800 p-4">
        <div class="container mx-auto px-8 flex justify-between items-center">
          <div class="text-white font-bold">
            <nuxt-link to="/" class="hover:text-gray-300">Zeeg Demo</nuxt-link>
          </div>
          <div class="space-x-4">
            <nuxt-link to="/" class="text-gray-300 hover:text-white">Dashboard</nuxt-link>
            <nuxt-link to="/calendar" class="text-gray-300 hover:text-white">Calendar</nuxt-link>
            <nuxt-link :to="`/${sanitizedUsername}/schedule`" class="text-gray-300 hover:text-white" target="_blank">Profile</nuxt-link>
            <button class="text-gray-300 hover:text-white" @click="logout">Logout</button>
          </div>
        </div>
      </nav>
  
      <!-- Page Content -->
      <div class="container mx-auto p-8">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useIndexedDB } from '~/composables/useIndexedDB';

  const { getUser } = await useIndexedDB();
  const { signOut, data } = useAuth();
  const sanitizedUsername = ref<string | null>(null);

  onMounted(async () => {
    if (data.value?.user) {
      const user = await getUser(data.value.user.email);
      if (user) {
        sanitizedUsername.value = user.sanitizedUsername;
      }
    }
  });


  const logout = async () => {
    await signOut({ callbackUrl: '/login' });
  };
  </script>