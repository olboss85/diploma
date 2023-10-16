<template>
    <div class="card">
      <h1>Отзывы</h1>
      <div v-for="review in reviews" :key="review.id">
        <Panel :header="`Отзыв пользователя: ` + review.name" toggleable>
          <p>{{ review.text }}</p>
        </Panel>
      </div>
    </div>
  </template>
  
  <script setup>
  import Panel from 'primevue/panel';
  import { collection, getDocs } from 'firebase/firestore'
  import { db } from '@/firebase'
  import { ref, onMounted } from 'vue';
  
  const reviews = ref([]);
  
  onMounted(async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'reviews'))
          querySnapshot.forEach((doc) => {
              reviews.value.push({
                  id: doc.id,
                  ...doc.data(),
              });
              console.log(reviews.value)
          });
      } catch (error) {
          console.error('Error getting reviews:', error);
      }
  });
  
  
  </script>