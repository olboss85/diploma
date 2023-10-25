<template>
    <Card class="tripId">
        <template #title> Simple Card 
            <i class="pi pi-times close-icon" @click="closePage"></i>
        </template>
        <template #header>
       
          </template>
        <template #content>

</template>
</Card>
  </template>

  <script setup>
import Card from 'primevue/card';
import { useRouter } from 'vue-router';

const router = useRouter();

const closePage = () => {
  router.go(-1);
}

</script>

<style scoped>
.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #333; 
}

.tripId{
    height: 500px;
}
</style>