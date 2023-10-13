import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref, computed } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export const useUser = () => {
  const user = ref()

  const loading = ref({
    user: false
  })

  const auth = getAuth()

  const userRemake = computed(() => {
    if (user.value) {
      return {
        displayName: user.value.displayName,
        email: user.value.email,
        photoURL: user.value.photoURL,
        uid: user.value.uid
      }
    }
    return null
  })

  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user
        await addUserToMainDatabase()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true
    try {
      if (userRemake.value) {
        await addDoc(collection(db, 'users'), userRemake.value)
      }
      loading.value.user = false
    } catch (error) {
      console.error(error)
    }
  }

  function googleLogout() {
    localStorage.removeItem('user')
    location.reload()
  }

  return {
    user,
    loading,
    googleRegister,
    googleLogout
  }
}