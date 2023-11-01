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
      <p><strong>Destination:</strong> {{ content.selectedCityWritten || content.selectedCity }}</p>
      <p><strong>Type of trip:</strong> {{ content.typeOfTrip?.name }}</p>
      <p><strong>Date:</strong> {{ formatDate(content.date) }}</p>
      <p><strong>Price:</strong> {{ `${parseInt(content.price)} KZT` }}</p>

      <Button class="btn" label="More information" />
    </template>
  </Card>
</template>

<style scoped>
.trip-image {
  height: 168px;
  width: 255px;
  border-radius: 6px;
}

.btn {
  margin-bottom:15px;
  padding: 10px 35px;
  gap: 10px;
  border-radius: 10px;
  background: #0d606f;
  box-shadow:
    0px 2px 3px 0px rgba(13, 96, 111, 0.16),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.p-card-content p {
  margin:15px 0px;
}

</style>