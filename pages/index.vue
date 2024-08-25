<template>
  <div class="">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <DashboardTable />
    <div class="mt-6">
      <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" @click="signOut()">
        Log Out
      </button>
    </div>
  </div>
</template>

<script setup>
import DashboardTable from '~/components/DashboardTable.vue';
const {signOut} = useAuth()
</script>