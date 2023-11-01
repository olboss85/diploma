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
  <div class="wrapper">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped>
.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
