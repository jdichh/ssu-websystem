import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { ref, onUnmounted } from 'vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  //change this configuration if migrating to another database in firebase
  apiKey: "AIzaSyBVirBpZvWclB_eKNofu8DZLZ6T2jvTi5g",
  authDomain: "geoloccapstone.firebaseapp.com",
  databaseURL: "https://geoloccapstone-default-rtdb.firebaseio.com",
  projectId: "geoloccapstone",
  storageBucket: "geoloccapstone.appspot.com",
  messagingSenderId: "1018081186988",
  appId: "1:1018081186988:web:f076a41933fb8fd9dbbb09",
  measurementId: "G-T635YWT2VM"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

//CRUD for Security Personnel
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
  if(confirm('Are you sure you want to DELETE this record?')){
    return usersCollection.doc(id).delete()
  }
}
//loading data (users) by lastname
export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.orderBy('lastName').limit(2).onSnapshot((snapshot) => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
 
//CRUD for Reports
const reportsCollection = db.collection('reports')
export const createReport = report => { //this is useless code, possibly delete later on
  return reportsCollection.add(report)
}
export const getReport = async id => {
  const report = await reportsCollection.doc(id).get()
  return report.exists ? report.data() : null
}
export const updateReport = (id, report) => { //this is useless code, possibly delete later on
  return reportsCollection.doc(id).update(report)
}
export const deleteReport = id => { //maybe useless?
  return reportsCollection.doc(id).delete()
}
//getting data (reports)
export const useLoadReports = () => {
  const reports = ref([])
  const close = reportsCollection.onSnapshot(snapshot => {
    reports.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return reports
}
