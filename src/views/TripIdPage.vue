<template>

  <Skeleton v-if="!content" :width="'400px'">

  </Skeleton>

  <Card v-else>
    <template #header>
      <i class="pi pi-times close-icon" @click="closePage"></i>
    </template>
  <template #content>
    <img :src="content.image" class="trip-image" />
    <p><strong>Travel Agency:</strong> {{ content?.travelAgency }}</p>
    <p><strong>Destination:</strong> {{ content.selectedCityWritten || content.selectedCity }}</p>
      <p><strong>Type of trip:</strong> {{ content.typeOfTrip?.name }}</p>
      <p><strong>Date:</strong> {{ formatDate(content.date) }}</p>
      <p><strong>Price:</strong> {{ `${parseInt(content.price)} KZT` }}</p>
    <p><strong>Description:</strong> {{ content?.description }}</p>
  </template>
</Card>

<Card class="tripId">
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

    <Button class="btn" label="Join" @click="willTravel" />
    <div class="card flex justify-content-center">
      <AvatarGroup>
        <div v-for="person in content?.peopleThatWillTravel" :key="person.uid">
          <Avatar :image="person.photoURL" class="mr-2" size="large" shape="circle"/>
        </div>
      </AvatarGroup>
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
  font-size: 30px;
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

.p-card{
  width: 500px;
    text-align: center;
    margin: 0 auto;
}

.btn {
  padding: 10px 35px;
  gap: 10px;
  border-radius: 10px;
  background: #0d606f;
  box-shadow:
    0px 2px 3px 0px rgba(13, 96, 111, 0.16),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

</style>