<script setup>
import { defineProps } from 'vue'
import Card from 'primevue/card'
import { formatDate } from '@/service/methods'
import MoreButton from '@/components/MoreButton.vue'

defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <Card>
      <template #header>
        <img :src="content.image" class="trip-image" />
      </template>
    <template #content>
      <p>Travel Agency {{ content.travelAgency }}</p>
      <p>Destination {{ content.selectedCityWritten || content.selectedCity }}</p>
      <p>Type of trip {{ content.typeOfTrip?.name }}</p>
      <p>Date {{ formatDate(content.date) }}</p>
      <p>Price {{ `${parseInt(content.price)} KZT` }}</p>
      <p>Description {{ content.description }}</p>
      <MoreButton />
    </template>
  </Card>
</template>

<style scoped>
.trip-image {
  height: 168px;
  width: 265px;
  border-radius: 6px;
}
</style>