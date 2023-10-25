
<template>
  <Card class="tripId">
    <template #title>Простая карта 
      <i class="pi pi-times close-icon" @click="closePage"></i>
    </template>
    <template #header></template>
    <template #content>
      <div class="buttons">
        <div class="counter-container">{{ likes }}</div>
        <button v-if="user" class="like-button" @click="toggleLike" :disabled="likes.value > 0">
          <i class="pi pi-thumbs-up-fill"></i>
        </button>
        <div class="counter-container">{{ dislikes }}</div>
        <button v-if="user" class="dislike-button" @click="toggleDislike" :disabled="dislikes.value > 0">
          <i class="pi pi-thumbs-down-fill"></i>
        </button>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue'; 
import Card from 'primevue/card';
import { useRouter } from 'vue-router';
import { useUser } from '../composables/useUser';

const router = useRouter();
const user = useUser()

const closePage = () => {
  router.go(-1);
}

const likes = ref(parseInt(localStorage.getItem(`likes_${router.currentRoute.value.params.id}`)) || 0);
const dislikes = ref(parseInt(localStorage.getItem(`dislikes_${router.currentRoute.value.params.id}`)) || 0);

const toggleLike = () => {
  if (likes.value === 0) {
    likes.value = 1;
    dislikes.value = 0;
  } else {
    likes.value = 0;
  }
  updateLocalStorage();
};

const toggleDislike = () => {
  if (dislikes.value === 0) {
    dislikes.value = 1;
    likes.value = 0;
  } else {
    dislikes.value = 0;
  }
  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem(`likes_${router.currentRoute.value.params.id}`, likes.value.toString());
  localStorage.setItem(`dislikes_${router.currentRoute.value.params.id}`, dislikes.value.toString());
};
</script>

<style scoped>
.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #333; 
}

.tripId {
  height: 500px;
}

.like-button,
.dislike-button {
  background-color: white;
  width: 35px;
}

.like-button:disabled,
.dislike-button:disabled {
  background-color: #ccc; /* Цвет фона для неактивных кнопок */
  cursor: not-allowed; /* Курсор для неактивных кнопок */
}

.buttons {
  margin: 0 auto;
  width: 200px;
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.counter-container {
  border: 2px solid black; 
  padding: 5px; 
  width: 35px;
}
</style>