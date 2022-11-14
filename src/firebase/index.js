import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { ref, onUnmounted } from 'vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBRf_1UfXXp3wWFlNkX9mNKWbWtULGJF0o",
  authDomain: "geoloccapstone.firebaseapp.com",
  databaseURL: "https://geoloccapstone-default-rtdb.firebaseio.com",
  projectId: "geoloccapstone",
  storageBucket: "geoloccapstone.appspot.com",
  messagingSenderId: "1018081186988",
  appId: "1:1018081186988:web:f076a41933fb8fd9dbbb09",
  measurementId: "G-T635YWT2VM"
};


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
  const close = usersCollection.orderBy('lastName').onSnapshot((snapshot) => {
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
  if(confirm('Are you sure you want to DELETE this record?')){
  return reportsCollection.doc(id).delete()
  }
}
//getting data (reports)
export const useLoadReports = () => {
  const reports = ref([])
  const close = reportsCollection.orderBy('dateTime', 'desc').onSnapshot(snapshot => {
    reports.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return reports
}
//getting latest 5 reports (home page)
export const useLatestReports = () => {
  const reports = ref([])
  const close = reportsCollection.orderBy('dateTime').limit(5).onSnapshot(snapshot => {
    reports.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return reports
}

//CRUD for Events
const eventsCollection = db.collection('events')

export const createEvents = event => {
  return eventsCollection.add(event)
}
export const getEvents = async id => {
  const event = await eventsCollection.doc(id).get()
  return event.exists ? event.data() : null
}
export const updateEvents = (id, event) => {
  return eventsCollection.doc(id).update(event)
}
export const deleteEvents = id => {
  if(confirm('Are you sure you want to DELETE this record?')){
    return eventsCollection.doc(id).delete()
  }
}
//loading data (events) by date & time
export const useLoadEvents = () => {
  const events = ref([])
  const close = eventsCollection.orderBy('eventStart').onSnapshot((snapshot) => {
    events.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return events
}

//DTR
const timeRecordCollection = db.collection('timeRecord')

export const getDTR = async id => {
  const timeRecord = await timeRecordCollection.doc(id).get()
  return timeRecord.exists ? timeRecord.data() : null
}

export const useLoadDTR = () => {
  const timeRecord = ref([])
  const close = timeRecordCollection.orderBy('dtrLogin').limit(20).onSnapshot((snapshot) => {
    timeRecord.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return timeRecord
}