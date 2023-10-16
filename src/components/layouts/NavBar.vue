<template>
  <div class="container">
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
      <Button class="btn" v-if="!user" @click="googleRegister"
        >Login</Button
      >
      <Button class="btn" v-else @click="googleLogout">Logout</Button>
    </div>

    <div class="sidebar card flex justify-content-center">
      <Sidebar v-model:visible="visible">
        <h2>Ваш отзыв</h2>
        <p>
          Оставьте Ваш отзыв здесь, или напишите вопрос к нам, и мы свяжемся с Вами в ближайшее
          время!
        </p>

        <div class="in flex flex-column gap-2">
          <label for="username">Ваше имя</label>
          <InputText
            id="username"
            v-model="value"
            aria-describedby="username-help"
            @input="validateInput"
          />
          <small id="username-help">Введите Ваше имя</small>
        </div>
        <div class="in flex-auto">
          <label for="phone">Номер телефона</label>
          <InputMask
            v-model="value2"
            date="phone"
            mask="+7(999) 999-9999"
            placeholder="+7(705) 111-1234"
          />
          <small id="username-help">Введите телефон</small>
        </div>
        <div class="in flex flex-column gap-2">
          <label for="text">Отзыв или вопрос</label>
          <InputText id="comment" v-model="comment" />
          <small id="text-help">Напишите Ваш отзыв или вопрос</small>
        </div>
        <Button type="submit" label="Отправить" @click="handleSubmit" />
      </Sidebar>
    </div>
    <Button class="btn" @click="visible = true">Your review </Button>
    <Toast />
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
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
  {
    label: 'Popular Destination',
    route: '/popularDestination'
  },
  {
    label: 'Travel Reviews',
    route: '/travelReview'
  }
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
        text: comment.value
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
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  border: 1px solid #000;
  background:rgba(242, 120, 92, 0.70);
  box-shadow: 0px 4px 4px 0px rgba(13, 96, 111, 0.5);
}

.nav {
  width: 800px;
  padding: 20px;
}
.p-tabmenu-nav {
  border: none;
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
}

:deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link) {
  color: #5a5858; 
}

:deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link){
  border: none;
}


</style>
