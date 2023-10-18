<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
// import { RouterLink } from 'vue-router'
import NavBar from '@/components/layouts/Navbar.vue'
</script>

<template>
  <NavBar />
  <router-view />
  <Footer />
</template>

<style scoped>
body {
  position: relative;
  min-height: 100vh;
  padding-bottom: 50px; 
}

</style>
