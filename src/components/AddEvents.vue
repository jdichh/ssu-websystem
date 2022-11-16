<script>
import { createEvents } from '@/firebase'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
  
export default {
  setup() {
    const date = ref(new Date())
    const router = useRouter()

    const form = reactive({   
        description: '',
        eventStart: '',
        eventEnd: ''})
  
    const onSubmit = async () => {
      await createEvents({ ...form })
      router.push('/events')
      form.description = ''
      form.eventStart = ''
      form.eventEnd = ''
    }
    return { form, onSubmit, date}
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
              <h2><icon class="fa-solid fa-calendar-plus"/>&nbsp;&nbsp;Add New Event</h2>
            </div>
          </div>
        </div>

        <form class="login" @submit.prevent="onSubmit">
        <p>Event Details</p>
            <div class="row justify-content-evenly" style="padding-top:40px">
                            <div class="col-md-3 mb-2 pb-2">
                              <div>
                                <label>Description</label>
                                <input v-model="form.description" @keypress="validateText" maxlength="60" style="color:black" required />
                              </div>
                            </div>

                            <div class="col-md-3 mb-2 pb-2">
                                <label style="padding-bottom: 5px;">Start</label>
                                <Datepicker dark textInput v-model="form.eventStart" :minDate="new Date()" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
                            </div>

                            <div class="col-md-3 mb-2 pb-2">
                                <label style="padding-bottom: 5px;">End</label>
                                <Datepicker dark textInput v-model="form.eventEnd" :minDate="new Date()" :monthChangeOnScroll="false" hideOffsetDates hideInputIcon required/>
                            </div>
            </div>                

            <div class="flex justify-space-between mb-4 flex-wrap gap-4">
              <button class="btn btn-danger mt-3" @click="$router.push('/events')">
                Cancel
              </button>
                    
              <button type="submit" class="btn btn-success mt-3">
                Add Event
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