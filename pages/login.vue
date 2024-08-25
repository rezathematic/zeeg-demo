<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">Login to Your Account</h1>
        <button class="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-700" @click="signIn('google')">
          Login with Google
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' },
  layout: 'guest'
})

const { signIn  } = useAuth()

  </script>