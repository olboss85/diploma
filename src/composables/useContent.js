import { getDocs, addDoc, doc, collection, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref } from 'vue'
import * as firebase from 'firebase/storage'
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useUser } from './useUser'
import { createId } from '../service/methods'

export const useContent = () => {
  const { userToObject, user } = useUser()

  const content = ref()
  const contentList = ref([])
  const newContent = ref({
    id: createId(),
    author: '',
    travelAgency: '',
    selectedCity: '',
    selectedCityWritten: '',
    date: '',
    value: '',
    price: '',
    description: '',
    typeOfTrip: '',
    image: null,
    likes: 0,
    dislikes: 0,
    peopleThatWillTravel: []
  })

  const editContent = ref({
    id: createId(),
    author: '',
    travelAgency: '',
    selectedCity: '',
    selectedCityWritten: '',
    date: '',
    value: '',
    price: '',
    description: '',
    typeOfTrip: '',
    image: null,
    likes: 0,
    dislikes: 0,
    peopleThatWillTravel: []
  })

  const loading = ref({
    content: false,
    contentList: false,
    newContent: false
  })

  async function getAllContent() {
    loading.value.contentList = true
    contentList.value.length = 0;
    try {
      const querySnapshot = await getDocs(collection(db, 'contents'))
      querySnapshot.forEach((doc) => {
        const compressive = {
          firebaseId: doc.id,
          ...doc.data()
        }
        contentList.value.push(compressive)
      })
      loading.value.contentList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function getContentById(id) {
    loading.value.content = true
    try {
      const querySnapshot = await getDocs(collection(db, 'contents'))
      content.value = querySnapshot.docs.map((doc) => {
        return {
          firebaseId: doc.id,
          ...querySnapshot.docs.map((doc2) => doc2.data()).find((item) => item.id === id)
        }
      })
      content.value = content.value[0]
      loading.value.content = false
    } catch (error) {
      console.error(error)
    }
  }

  async function addContent() {
    loading.value.newContent = true
    try {
      if (newContent.value && userToObject.value) {
        newContent.value.author = userToObject.value
        await addDoc(collection(db, 'contents'), newContent.value)
        loading.value.newContent = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteDocById(firebaseId) {
    loading.value.content = true
    try {
      await deleteDoc(doc(db, 'content', firebaseId))
      loading.value.content = false
    } catch (error) {
      console.error(error)
    }
  }

  async function uploadImage(file) {
    console.log(file)
    const storage = getStorage()
    console.log(storage)
    const storageRef = firebase.ref(storage, 'contents/' + file.name)
    console.log(storageRef)

    uploadBytes(storageRef, file)
      .then(() => {
        console.log('Файл успешно загружен!')

        getDownloadURL(storageRef)
          .then((downloadURL) => {
            newContent.value.image = downloadURL
          })
          .catch((error) => {
            console.error('Ошибка получения ссылки на загруженный файл:', error)
          })
      })
      .catch((error) => {
        console.error('Ошибка загрузки файла:', error)
      })
  }

  // вот тут функция updateContent
  async function updateContent(firebaseId) {
    try {
      console.log(content.value)
      if (content.value) {
        await updateDoc(doc(db, 'contents', firebaseId), content.value)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function personWantTravel() {
    let first = true
    if (user.value && content.value?.peopleThatWillTravel) {
      content.value.peopleThatWillTravel.filter(async (person) => {
        first = false
        if (person.uid !== user.value.uid) {
          content.value.peopleThatWillTravel.push(user.value)
          console.log(content.value.firebaseId)
          await updateContent(content.value.firebaseId)
        }
      })
      if (first) {
        content.value.peopleThatWillTravel.push(user.value)
        console.log(user.value)
        await updateContent(content.value.firebaseId)
      }
    }
  }

  return {
    content,
    contentList,
    loading,
    newContent,
    getAllContent,
    getContentById,
    addContent,
    updateContent,
    deleteDocById,
    uploadImage,
    personWantTravel,
    editContent
  }
}
