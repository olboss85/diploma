<template>
    <h1>Trip offers</h1>
    <div class="card">
      <div class="trip" v-for="content in contents" :key="content.id">
        <TripItem :content="content" @click="goToTripUrl(content.id)" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { collection, getDocs } from 'firebase/firestore'
  import { db } from '@/firebase'
  import { ref, onMounted } from 'vue';
  import TripItem from '@/components/TripItem.vue'
  import { useRouter } from 'vue-router'
  
  const contents = ref([]);
  const router = useRouter();

  function goToTripUrl(id) {
  router.push({ name: 'content', params: { id }})
}

  onMounted(async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'contents'))
          querySnapshot.forEach((doc) => {
              contents.value.push({
                  id: doc.id,
                  ...doc.data(),
              });
              console.log(contents.value)
          });
      } catch (error) {
          console.error('Error getting reviews:', error);
      }
  });
  
  
  </script>

  <style scoped>

  .card{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .trip {
    padding-inline: 50px;
    text-align: center;
    width: 355px;
    margin: 20px
  }
  :deep(.p-card:hover) {

      cursor: pointer;
    }
</style>