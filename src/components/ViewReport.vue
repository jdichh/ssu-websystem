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
        reportID: '',
        })

    onMounted(async () => {
      const report = await getReport(reportId.value)
      console.log(report, reportId.value)
      form.lastName = report.lastName
      form.firstName = report.firstName
      form.middleName = report.middleName
      form.eventType = report.eventType
      form.eventDetails = report.eventDetails
      form.dateTime = report.dateTime //add .toDate() and .toDateString() methods to convert timestamps to readable human text
      form.coords = report.coords
      form.reportID = report.reportID
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
              <h2><icon class="fa-solid fa-clipboard-question"/>&nbsp;&nbsp;Report Title: {{ form.eventType }}</h2>
            </div>
            <div class="col-sm-6">
                <a>
                  <button type="button" class="btn btn-primary">
                    <a :href="`https://www.openstreetmap.org/search?query=${form.coords}#map=19/`" target="_blank" style="color:white">
                      View Location
                    </a>
                  </button>
                </a>
              </div>
          </div>

        </div>
        <form class="login">
            <div class="row justify-content-evenly">
              <p>Reported by {{ form.lastName.toUpperCase() + ", " + form.firstName + " " + form.middleName }} at {{ form.dateTime }}</p>
              <h1></h1>
                            
                  <div class="col-md-5 mb-2 pb-2">
                    <div>
                      <label style="padding-bottom: 5px;">Full Details</label>
                      <el-input type="textarea" readonly size="large" v-model="form.eventDetails" style="color:black; font-size:17px;padding-bottom:25px"/>
                    </div>
                  </div>

                  <div>
                    <div>       
                      <h6>Report ID: {{ form.reportID }}</h6>
                    </div>
                  </div>
  
            </div>

              <button type="button" class="btn btn-info" @click="$router.push('/reports')">
                Back to Reports
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
  margin-top: 10px;
  margin-left: 4px;
  padding-bottom: 20px;
  text-align: left;
}

h6{
  padding-bottom: 10px;
  text-align: left;
  color: rgb(143, 142, 142)
}
</style>