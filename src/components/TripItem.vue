<script setup>
import { defineProps } from 'vue'
import Card from 'primevue/card'
import { formatDate } from '@/service/methods'
import Button from 'primevue/button';

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
      <Button label="More information" />
    </template>
  </Card>
</template>

<style scoped>
.trip-image {
  height: 168px;
  width: 255px;
  border-radius: 6px;
}
</style>