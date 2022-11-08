<script>
import { reactive, computed, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { getReport } from '@/firebase'
import '@vuepic/vue-datepicker/dist/main.css'

export default {

  setup() {
    const route = useRoute()
    const reportId = computed(() => route.params.id)

    const form = reactive({   
        lastName: '',
        firstName: '',
        middleName: '', 
        eventType: '',
        eventDetails: '',
        dateTime: '',
        coords: '',
        })

    onMounted(async () => {
      const report = await getReport(reportId.value)
      console.log(report, reportId.value)
      form.lastName = report.lastName
      form.firstName = report.firstName
      form.middleName = report.middleName
      form.eventType = report.eventType
      form.eventDetails = report.eventDetails
      form.dateTime = report.dateTime.toDate() //toDate and toDateString methods convert timestamps to readable human text
      form.coords = report.coords
    })

    return { form }
   
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
              <h2><icon class="fa-solid fa-clipboard-question"/>&nbsp;&nbsp;Full Report Details</h2>
            </div>
          </div>

        </div>
        <form class="login">
          <p>Report Type: {{ form.eventType }}</p> 
            <div class="row justify-content-evenly">
                <div class="col-md-2 mb-2 pb-2">
                  <div>
                    <label>Last Name</label>
                    <input v-model="form.lastName" readonly @keypress="validateText" style="color:black" required />
                  </div>
                </div>

                <div class="col-md-2 mb-1 pb-2">
                  <div>
                    <label>First Name</label>
                    <input v-model="form.firstName" readonly @keypress="validateText" style="color:black" required />
                  </div>
                </div>

                <div class="col-md-2 mb-1 pb-2">
                  <div>
                    <label>Middle Name</label>
                    <input v-model="form.middleName" readonly @keypress="validateText" style="color:black"/>
                  </div>
                </div>

            <p>Report Details</p>
                          
                <div class="col-md-3 mb-2 pb-2">
                  <div>
                    <label>Event Details</label>
                    <el-input type="textarea" readonly autosize v-model="form.eventDetails" style="color:black; font-size:17px"/>
                  </div>
                </div>

                <div class="col-md-2 mb-2 pb-2">
                    <label style="padding-bottom: 5px;">Date & Time Reported</label>
                    <Datepicker readonly dark v-model="form.dateTime" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
                </div>
 
            </div>

            <button type="button" class="btn btn-danger" @click="$router.push('/reports')">
              Back to Reports
            </button>

            <button type="button" class="btn btn-primary">
                <a :href="`https://www.openstreetmap.org/search?query=${form.coords.latitude}%2C${form.coords.longitude}#map=19/${form.coords.latitude}/${form.coords.longitude}`" target="_blank" style="color:white">View Location</a>
            </button>
                  
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