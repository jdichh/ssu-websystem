import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import 'mdb-vue-ui-kit/css/mdb.min.css'
import '@fortawesome/fontawesome-free/js/all'
import 'material-icons/iconfont/material-icons.css';

const app = createApp(App)
app.use(store)
app.use(router)
app.component('Datepicker', Datepicker)
app.mount('#app')
