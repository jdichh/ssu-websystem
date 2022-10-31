import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ref, onUnmounted } from 'vue'

const firebaseConfig = {
  apiKey: "AIzaSyDegJUpcTTTrTavpH3utSFxJTSTiA_rtKA",
  authDomain: "test-f17ce.firebaseapp.com",
  projectId: "test-f17ce",
  storageBucket: "test-f17ce.appspot.com",
  messagingSenderId: "898592687020",
  appId: "1:898592687020:web:7d24f66738711830a3b009"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}


export { auth }