<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
// import { RouterLink } from 'vue-router'
import NavBar from '@/components/layouts/NavBar.vue';
import { useUser } from './composables/useUser'
import { onMounted } from 'vue'

onMounted(() => {
  getUserFromLocalStorage()
})

const { getUserFromLocalStorage } = useUser()
</script>

<template>
  <NavBar />
  <router-view />
  <Footer />
</template>

<style scoped>


</style>
