<template>
  <h1>Your reviews</h1>
  <div class="card">
    <div class="rev" v-for="review in reviews" :key="review.id">
      <Panel :header="`Name: ` + review.name" toggleable>
        <p>{{ review.text }}</p>
        <p style="text-align: center">{{ displayRating(review.rating) }}</p>
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

const displayRating = (rating) => {
  const filledStars = '★'.repeat(Math.floor(rating)); // Закрашенные звёзды
  const emptyStars = '☆'.repeat(5 - filledStars.length); // Пустые звёзды
  return filledStars + emptyStars;
};

</script>

<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.rev {
  width: 350px;
  margin: 15px 0;
  border: 2px solid white; 
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
</style>