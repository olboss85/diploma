<template>
  <div class="container">
    <div>
      <img src="@/assets/Vector.png" />
    </div>
    <div>
      <p class="head">Travel Portal</p>
    </div>
    <div class="card nav">
      <TabMenu v-model:activeIndex="active" :model="items">
        <template #item="{ label, item, props }">
          <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
            <a
              :href="routerProps.href"
              v-bind="props.action"
              @click="($event) => routerProps.navigate($event)"
              @keydown.enter.space="($event) => routerProps.navigate($event)"
            >
              <span v-bind="props.icon" />
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </router-link>
        </template>
      </TabMenu>
    </div>

    <div class="side">
      <Button class="btn" v-if="!user" @click="googleRegister">Login</Button>
      <Button class="btn" v-else @click="googleLogout">Logout</Button>
    </div>

    <Button class="btn" @click="visible = true">Your review </Button>

    <div class="sidebar card flex justify-content-center">
      <Dialog v-model:visible="visible" modal header="Add your review" :style="{ 'width': '316px', 'text-align': 'center' }">
        <div class="modal_window flex flex-column gap-2">
          <InputText
            id="username"
            v-model="value"
            aria-describedby="username-help"
            placeholder="Your name"
            @input="validateInput"
          />
        </div>
        <div class="modal_window flex-auto">
          <InputMask
            v-model="value2"
            date="phone"
            mask="+7(999) 999-9999"
            placeholder="+7(705) 111-1234"
          />
        </div>
        <div class="modal_window flex flex-column gap-2">
          <Textarea
            id="comment"
            v-model="comment"
            autoResize
            rows="5"
            cols="34"
            placeholder="Your feedback"
          />
        </div>
        <div class="modal_window star card flex justify-content-center">
          <Rating v-model="valueStar" :cancel="false"  />
      </div>
        <div style="text-align: center">
          <Button class="btn" type="submit" label="Confirm" @click="handleSubmit" />
        </div>
      </Dialog>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import Rating from 'primevue/rating';
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Dialog from 'primevue/dialog'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useUser } from '@/composables/useUser'
import TabMenu from 'primevue/tabmenu'

const { user, googleRegister, googleLogout } = useUser()

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const valueStar = ref(null);
const active = ref(0)
const items = ref([
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Find Your Trip',
    route: '/findYourTrip'
  },
  // {
  //   label: 'Popular Destination',
  //   route: '/popularDestination'
  // },
  {
    label: 'Travel Reviews',
    route: '/travelReview'
  },
  // {
  //   label: 'Contacts',
  //   route: '/contacts'
  // }
])

onMounted(() => {
  active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path)
})

const visible = ref(false)
const value = ref('')
const validateInput = (event) => {
  const inputText = event.target.value
  const filteredText = inputText.replace(/[^A-Za-zА-Яа-я\s]/g, '')
  value.value = filteredText
}
const value2 = ref('')
const comment = ref('')

const toast = useToast()
const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Message Content',
    life: 3000
  })
}
const showError = () => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 })
}

import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const handleSubmit = async () => {
  if (value.value && value2.value && comment.value) {
    try {
      const newReview = {
        name: value.value,
        phone: value2.value,
        text: comment.value,
        rating: valueStar.value,
      }
      const docRef = await addDoc(collection(db, 'reviews'), newReview)
      console.log('Review added with ID:', docRef.id)
      showSuccess()
      value.value = ''
      value2.value = ''
      comment.value = ''
      visible.value = false
    } catch (error) {
      console.error('Error adding review:', error)
      showError()
    }
  } else {
    showError()
  }
}
</script>

<style scoped>
.head {
  color: #fff;
  font-family: Magra;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.container {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  min-width: 1200px;
  max-width: 1200px;
  background: rgba(242, 120, 92, 0.7);
  box-shadow: 0px 4px 4px 0px rgba(13, 96, 111, 0.5);
}

.nav {
  width: 590px;
  padding: 20px;
}

:deep(.p-tabmenu-nav) {
  border: none;
  justify-content: space-evenly;
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

:deep(.p-tabmenu .p-tabmenu-nav) {
  border: none !important;
  background-color: transparent;
}

:deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link) {
  color: #fff;
}

:deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link) {
  border: none;
  background-color: transparent;
}

.modal_window {
  margin: 10px 5px;
  padding: 5px 0;
}

.p-rating{
  justify-content: center;
}

:deep(.p-inputtext) {
  width: 304px;
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

.p-dialog-footer{
  padding-bottom: 15px;
}
</style>
