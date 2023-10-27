<template>
  <h1>Trip offers</h1>
  <div class="card">
    <div class="trip" v-for="content in contentList" :key="content.id">
      <TripItem :content="content" @click="goToTripUrl(content.id)" />
    </div>
  </div>
</template>

<script setup>
import {onMounted } from 'vue'
import TripItem from '@/components/TripItem.vue'
import { useRouter } from 'vue-router'
import { useContent } from '../composables/useContent'

const {getAllContent, contentList} = useContent()

const router = useRouter()

function goToTripUrl(id) {
  router.push({ name: 'content', params: { id } })
}

onMounted(async () => {
 await getAllContent()
})
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.trip {
  padding-inline: 50px;
  text-align: center;
  width: 355px;
  margin: 20px;
}
:deep(.p-card:hover) {
  cursor: pointer;
}
</style>
