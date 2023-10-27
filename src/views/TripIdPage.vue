<template>
  <div class="card flex justify-content-center">
    <div class="card flex justify-content-center">
      <AvatarGroup>
        <div v-for="user in users" :key="user.id">
          <Avatar :image="content.personWantTravel.photoURL" class="mr-2" size="large" shape="circle" />
          {{ content.personWantTravel.photoURL }}
          {{ content.personWantTravel.displayName }}
          {{ content.peopleThatWillTravel.displayName }}
        </div>
      </AvatarGroup>
    </div>
  </div>

  {{ content }}
  <!-- <Avatar :image="content.peopleThatWillTravel.photoURL " class="mr-2" size="large" shape="circle" />
  {{ content.personWantTravel.displayName }} -->
  

  <Skeleton v-if="!content" :width="'400px'">

  </Skeleton>

  <Card v-else>
    <template #header>
      <img :src="content.image" class="trip-image" />
    </template>
  <template #content>
    <p>Travel Agency {{ content?.travelAgency }}</p>
    <p>Destination {{ content?.selectedCityWritten || content?.selectedCity }}</p>
    <p>Type of trip {{ content?.typeOfTrip?.name }}</p>
    <p>Date {{ formatDate(content?.date) }}</p>
    <p>Price {{ `${parseInt(content?.price)} KZT` }}</p>
    <p>Description {{ content?.description }}</p>
    {{ content?.likes }}
    {{ content?.dislikes }}
  </template>
</Card>


<Button label="Submit" @click="willTravel" />


  <Card class="tripId">
    <template #title>
      Простая карта
      <i class="pi pi-times close-icon" @click="closePage"></i>
    </template>
    <template #header></template>
    <template #content>
      <div class="buttons">
        <div class="counter-container">{{ likes }}</div>
        <button v-if="user" class="like-button" @click="toggleLike" :disabled="likes > 0">
          <i class="pi pi-thumbs-up-fill"></i>
        </button>
        <div class="counter-container">{{ dislikes }}</div>
        <button v-if="user" class="dislike-button" @click="toggleDislike" :disabled="dislikes > 0">
          <i class="pi pi-thumbs-down-fill"></i>
        </button>
      </div>
    </template>
  </Card>
</template>

<script setup>
import AvatarGroup from 'primevue/avatargroup'; 
import Avatar from 'primevue/avatar';
import { ref, onMounted } from 'vue'; 
import Card from 'primevue/card';
import { useRouter, useRoute } from 'vue-router';
import { useUser } from '../composables/useUser';
import {useContent} from '../composables/useContent'
import Skeleton from 'primevue/skeleton'
import { formatDate } from '@/service/methods'
import Button from 'primevue/button';

const router = useRouter();
const route = useRoute()
const users = ref([]);
const { user } = useUser();
const { getContentById, content, personWantTravel } = useContent()

onMounted(async () => {
  await getContentById(route.params.id)
})


const willTravel = () => {
    personWantTravel();

};

const closePage = () => {
  router.go(-1);
}

const likes = ref(parseInt(localStorage.getItem(`likes_${router.currentRoute.value.params.id}`) || 0));
const dislikes = ref(parseInt(localStorage.getItem(`dislikes_${router.currentRoute.value.params.id}`) || 0));

const toggleLike = () => {
  if (likes.value === 0) {
    likes.value = 1;
    dislikes.value = 0;
  } else {
    likes.value = 0;
  }
  updateLocalStorage();
  content.value.likes += 1
  content.value.likes > 0 ? content.value.dislikes -= 1 : content.value.dislikes
  // updateContent(content)
};

const toggleDislike = () => {
  if (dislikes.value === 0) {
    dislikes.value = 1;
    likes.value = 0;
  } else {
    dislikes.value = 0;
  }
  updateLocalStorage();
  content.value.dislikes += 1
  content.value.dislikes > 0 ? content.value.likes -= 1 : content.value.dislikes
  // updateContent(content)
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
  background-color: #ccc;
  cursor: not-allowed;
}
.trip-image {
  height: 168px;
  width: 255px;
  border-radius: 6px;
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