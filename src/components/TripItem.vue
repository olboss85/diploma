<script setup>
import { defineProps } from 'vue'
import Card from 'primevue/card'
import { formatDate } from '@/service/methods'


defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <Card>
    <template #content>
      <p>Travel Agency {{ content.travelAgency }}</p>
      <p>Destination {{ content.selectedCityWritten || content.selectedCity }}</p>
      <p>Type of trip {{ content.typeOfTrip?.name }}</p>
      <p>Date {{ formatDate(content.date) }}</p>
      <p>Price {{ `${parseInt(content.price)} KZT` }}</p>
      <p>Description {{ content.description }}</p>
    </template>
  </Card>
</template>
