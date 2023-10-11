import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const firebaseConfig = {
    apiKey: "AIzaSyAqjvy7vJtdFObvPcoV2uZQMuD2bxaquoQ",
    authDomain: "diploma-80c14.firebaseapp.com",
    projectId: "diploma-80c14",
    storageBucket: "diploma-80c14.appspot.com",
    messagingSenderId: "781429642698",
    appId: "1:781429642698:web:e8f8931ae2701780866b33"
  };

initializeApp(firebaseConfig);
const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.mount('#app')
