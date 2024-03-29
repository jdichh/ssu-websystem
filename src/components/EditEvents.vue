<script>
import { reactive, computed, onMounted, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEvents, updateEvents } from '@/firebase'
import '@vuepic/vue-datepicker/dist/main.css'

export default {

  methods: {
    validateNumber: (event) => { //ensures that only numbers are entered
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    },
    
    validateText: (event) => { //ensures that only letters are entered
        let keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode > 47 && keyCode < 58) {
          event.preventDefault();
        }
      },
  },
  
  setup() {
    const date = ref(new Date())
    const router = useRouter()
    const route = useRoute()
    const eventId = computed(() => route.params.id)

    const form = reactive({   
        description: '',
        eventStart: '',
        eventEnd: ''})

    onMounted(async () => {
      const event = await getEvents(eventId.value)
      console.log(event, eventId.value)
      form.descriptionOriginal = event.description
      form.eventStartOriginal = event.eventStart.toDate()
      form.eventEndOriginal = event.eventEnd.toDate()
      form.description = event.description
    })

    const update = async () => {
      await updateEvents(eventId.value, { ...form })
      router.push('/events')
      form.description = ''
      form.eventStart = ''
      form.eventEnd = ''
    }

    return { form, update, date }
   
  }
}
</script>

<template>
<form class="login" @submit.prevent="update">
  <div class="container-xl">
    <div class="card-responsive">
      <div class="card-wrapper">
        <div class="card-title">
          <div class="row">
            <div class="col-sm-6">
              <h2><icon class="fa-solid fa-calendar-xmark"/>&nbsp;&nbsp;Original Event Details</h2>
            </div>
          </div>
        </div>
        
            <div class="row justify-content-evenly" style="padding-top:40px">
              <div class="col-md-3 mb-2 pb-2">
                <div>
                  <label>Description</label>
                  <input disabled v-model="form.descriptionOriginal" style="color:black" required />
                </div>
              </div>

              <div class="col-md-2 mb-2 pb-2">
                <label style="padding-bottom: 5px;">Start</label>
                <Datepicker readonly dark v-model="form.eventStartOriginal" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
              </div>

              <div class="col-md-2 mb-2 pb-2">
                <label style="padding-bottom: 5px;">End</label>
                <Datepicker readonly dark v-model="form.eventEndOriginal" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
              </div>
            </div>              
      </div>
    </div>
  </div>

  <div class="container-xl">
    <div class="card-responsive">
      <div class="card-wrapper">
        <div class="card-title">
          <div class="row">
            <div class="col-sm-6">
              <h2><icon class="fa-solid fa-calendar-check"/>&nbsp;&nbsp;New Event Details</h2>
            </div>
          </div>
        </div>   

            <div class="row justify-content-evenly" style="padding-top:40px">
              <div class="col-md-3 mb-2 pb-2">
                <div>
                  <label>Description</label>
                  <input v-model="form.description" maxlength="60" style="color:black" required />
                </div>
              </div>

              <div class="col-md-2 mb-2 pb-2">
                  <label style="padding-bottom: 5px;">Start</label>
                  <Datepicker dark textInput v-model="form.eventStart" :minDate="new Date()" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
              </div>

              <div class="col-md-2 mb-2 pb-2">
                  <label style="padding-bottom: 5px;">End</label>
                  <Datepicker dark textInput v-model="form.eventEnd" :minDate="new Date()" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
              </div>
            </div>                

            <div class="flex justify-space-between mb-4 flex-wrap gap-4">
              <button class="btn btn-danger mt-3" @click="$router.push('/events')">
                Cancel Changes
              </button>
                    
              <button type="submit" class="btn btn-success mt-3">
                Confirm Changes
              </button>
            </div>
      </div>
    </div>
  </div>
</form>
</template>

<style scoped>

.card-responsive {
    margin-top: 20px;
}
.card-wrapper {
    background: rgb(235, 235, 235);
    padding: 20px 25px;
    border-radius: 3px;
    min-width: 1000px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.card-title {        
    padding-bottom: 15px;
    background: #1e2833;
    color: #fff;
    padding: 16px 30px;
    min-width: 100%;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}
.card-title h2 {
    margin: 5px 0 0;
    font-size: 30px;
    text-align: left;
}

.card-title .btn-group {
    float: left;
}
.card-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
}
.card-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}
.card-title .btn span {
    float: left;
    margin-top: 2px;
}

input {
  font-size: 16px;
}

p {
  font-size: 30px;
  font-weight: 500;
  margin: 5px 0 0;
  margin-top: 15px;
  margin-left: 4px;
  padding-bottom: 20px;
  text-align: left;
}
</style>