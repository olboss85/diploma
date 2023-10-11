import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAqjvy7vJtdFObvPcoV2uZQMuD2bxaquoQ",
    authDomain: "diploma-80c14.firebaseapp.com",
    projectId: "diploma-80c14",
    storageBucket: "diploma-80c14.appspot.com",
    messagingSenderId: "781429642698",
    appId: "1:781429642698:web:e8f8931ae2701780866b33"
  };

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }