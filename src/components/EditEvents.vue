<script>
import { reactive, computed, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getActivities, updateActivities } from '@/firebase'
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

    const router = useRouter()
    const route = useRoute()
    const activityId = computed(() => route.params.id)

    const form = reactive({   
        description: '',
        eventStart: '',
        eventEnd: ''})

    onMounted(async () => {
      const activity = await getActivities(activityId.value)
      console.log(activity, activityId.value)
      form.descriptionOriginal = activity.description
      form.eventStartOriginal = activity.eventStart.toDate()
      form.eventEndOriginal = activity.eventEnd.toDate()
      form.description = activity.description
      form.eventStart = activity.eventStart.toDate()
      form.eventEnd = activity.eventEnd.toDate()
    })

    const update = async () => {
      await updateActivities(activityId.value, { ...form })
      router.push('/events')
      form.description = ''
      form.eventStart = ''
      form.eventEnd = ''
    }

    return { form, update }
   
  }
}
</script>

<template>
  <div class="container-xl">
    <div class="card-responsive">
      <div class="card-wrapper">
        <div class="card-title">

          <div class="row">
            <div class="col-sm-6">
              <h2><icon class="fa-solid fa-calendar"/>&nbsp;&nbsp;Edit Event Detail</h2>
            </div>
          </div>

        </div>
        <form class="login" @submit.prevent="update">
            <p>Original Event Details</p>
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
            <p>New Event Details</p>     
            <div class="row justify-content-evenly" style="padding-top:40px">
                            <div class="col-md-3 mb-2 pb-2">
                              <div>
                                <label>Description</label>
                                <input v-model="form.description" maxlength="60" style="color:black" required />
                              </div>
                            </div>

                            <div class="col-md-2 mb-2 pb-2">
                                <label style="padding-bottom: 5px;">Start</label>
                                <Datepicker dark textInput v-model="form.eventStart" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
                            </div>

                            <div class="col-md-2 mb-2 pb-2">
                                <label style="padding-bottom: 5px;">End</label>
                                <Datepicker dark textInput v-model="form.eventEnd" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
                            </div>
            </div>                

            <div class="flex justify-space-between mb-4 flex-wrap gap-4">
              <button class="btn btn-danger mt-3" @click="$router.push('/events')">
                Cancel
              </button>
                    
              <button type="submit" class="btn btn-success mt-3">
                Confirm
              </button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-responsive {
    margin-top: 30px;
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