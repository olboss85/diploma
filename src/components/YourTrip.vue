<template>
    <h1>Trip offers</h1>
    <div class="card">
      <div class="trip" v-for="content in contents" :key="content.id">
        <TripItem :content="content" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { collection, getDocs } from 'firebase/firestore'
  import { db } from '@/firebase'
  import { ref, onMounted } from 'vue';
  import TripItem from '@/components/TripItem.vue'
  
  const contents = ref([]);
  
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
    border: 1px solid rgb(134, 133, 133);
    padding-inline: 50px;
    text-align: center;
    width: 365px;
    margin: 20px
  }
</style>