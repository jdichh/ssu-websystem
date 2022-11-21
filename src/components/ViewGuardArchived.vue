<script>
import { reactive, computed, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { getUserArchived } from '@/firebase'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  
  setup() {
    const route = useRoute()
    const userId = computed(() => route.params.id)

    const form = reactive({   
        lastName: '',
        firstName: '',
        middleName: '', 
        nameEx: '',
        birthDate: '',
        sex: '',
        civStat: '',
        bloodType: '',
        height: '',
        weight: '',
        conNumber: '',
        landNumber: '',
        homeAdd: '',
        ssuID: '',
        agency: '',
        position: '',
        licNum: '',
        issueDate: '',
        expDate: '',
        licenses: '',
        seminars: '',
        trainings: '',
        email: '' })

    onMounted(async () => {
      const user = await getUserArchived(userId.value)
      console.log(user, userId.value)
      form.lastName = user.lastName
      form.firstName = user.firstName
      form.middleName = user.middleName
      form.nameEx = user.nameEx
      form.birthDate = user.birthDate.toDate() //toDate and toDateString methods convert timestamps to readable human text
      form.sex = user.sex
      form.civStat = user.civStat
      form.bloodType = user.bloodType
      form.height = user.height
      form.weight = user.weight
      form.conNumber = user.conNumber
      form.landNumber = user.landNumber
      form.homeAdd = user.homeAdd
      form.ssuID = user.ssuID
      form.position = user.position
      form.agency = user.agency
      form.licNum = user.licNum
      form.issueDate = user.issueDate.toDate()
      form.expDate = user.expDate.toDate()
      form.licenses = user.licenses
      form.seminars = user.seminars
      form.trainings = user.trainings
      form.email = user.email
    })

    return { form }
   
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
              <h2><icon class="fa-solid fa-person"/>&nbsp;&nbsp;Personal Information</h2>
            </div>
          </div>
        </div>
            <div class="row justify-content-evenly">
                            <div class="col-md-3 mb-2 pb-2">
                              <div>
                                <label style="padding-top: 20px;">Last Name</label>
                                <input v-model="form.lastName" @keypress="validateText" style="color:black" disabled/>
                              </div>
                            </div>

                            <div class="col-md-3 mb-1 pb-2">
                              <div>
                                <label style="padding-top: 20px;">First Name</label>
                                <input v-model="form.firstName" @keypress="validateText" style="color:black" disabled/>
                              </div>
                            </div>

                            <div class="col-md-3 mb-1 pb-2">
                              <div>
                                <label style="padding-top: 20px;">Middle Name</label>
                                <input v-model="form.middleName" @keypress="validateText" style="color:black" placeholder="Optional" disabled/>
                              </div>
                            </div>
                          
                            <div class="col-md-1 mb-2 pb-2">
                              <div>
                                <label style="padding-top: 20px;">Suffix</label>
                                <input v-model="form.nameEx" @keypress="validateText" style="color:black" placeholder="Optional" disabled/>
                              </div>
                            </div>

                          <div class="col-md-2 mb-2 pb-2">
                            <label style="padding-top: 25px;">Sex</label>
                              <select class="form-select" v-model="form.sex" style="color:black" disabled >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                              <div>
                                <label>Height (cm)</label>
                                <input v-model="form.height" @keypress="validateNumber" maxlength="3" style="color:black" disabled/>
                              </div>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                              <div>
                                <label>Weight (kg)</label>
                                <input v-model="form.weight" @keypress="validateNumber" maxlength="3" style="color:black" disabled/>
                              </div>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                            <label style="padding-bottom: 5px;">Civil Status</label>
                              <select class="form-select" v-model="form.civStat" style="color:black" disabled>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Separated">Separated</option>
                                <option value="Widowed">Widowed</option>
                              </select>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                            <label style="padding-bottom: 5px;">Blood Type</label>
                              <select class="form-select" v-model="form.bloodType" style="color:black" disabled>
                                <option value="O+">O+</option>
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="AB+">AB+</option>
                                <option value="O-">O-</option>
                                <option value="A-">A-</option>
                                <option value="B-">B-</option>
                                <option value="AB-">AB-</option>
                              </select>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                            <label style="padding-bottom: 5px;">Date of Birth</label>
                            <Datepicker dark textInput v-model="form.birthDate" :maxDate="new Date()" :monthChangeOnScroll="false" :enableTimePicker="false" noToday hideOffsetDates hideInputIcon disabled/>
                          </div>
                          
                          <div class="col-md-4">
                            <label style="padding-bottom: 5px;">Home Address</label>
                            <input v-model="form.homeAdd" disabled style="color:black"/>
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
              <h2><icon class="fa-solid fa-address-book"/>&nbsp;&nbsp;Contact Information</h2>
            </div>
          </div>
        </div>
            <div class="row justify-content-evenly">
                          <div class="col-md-3">
                            <div>
                              <label style="padding-top: 20px;">Contact Number</label>
                              <input v-model="form.conNumber" @keypress="validateNumber" maxlength="11" style="color:black" disabled/>
                            </div>
                          </div>

                          <div class="col-md-3"> <!--REVISIT-->
                            <div>
                              <label style="padding-top: 20px;">Landline Number</label>
                              <input v-model="form.landNumber" @keypress="validateNumber" maxlength="10" style="color:black" disabled/>
                            </div>
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
              <h2><icon class="fa-solid fa-briefcase"/>&nbsp;&nbsp;Work Information</h2>
            </div>
          </div>
        </div>

            <div class="row justify-content-evenly">
                          <div class="col-md-2"> <!--DROPDOWN-->
                            <div>
                              <label style="padding-top: 20px;">Position</label>
                              <input v-model="form.position" @keypress="validateText" style="color:black" disabled/>
                            </div>
                          </div>

                          <div class="col-md-2">
                            <div>
                              <label style="padding-top: 20px;">SSU ID</label>
                            <input v-model="form.ssuID" style="color:black" disabled/>
                            </div>
                          </div>

                          <div class="col-md-2">
                            <div>
                              <label style="padding-top: 20px;">Agency</label>
                            <input v-model="form.agency" @keypress="validateText" style="color:black" disabled/>
                            </div>
                          </div>

                          <div class="col-md-2">
                            <div>
                              <label style="padding-top: 20px;">License Number</label>
                              <input v-model="form.licNum" style="color:black" disabled/>
                            </div>
                          </div>

                          <div class="col-md-2">
                            <!-- :maxDate="new Date()" -->
                            <label style="padding-top: 25px;">Date Issued</label>
                            <Datepicker dark textInput v-model="form.issueDate" :monthChangeOnScroll="false" :enableTimePicker="false" noToday hideOffsetDates hideInputIcon disabled/>
                          </div>

                          <div class="col-md-2">
                            <!-- :minDate="new Date()" -->
                            <label style="padding-top: 25px;">Expiry Date</label>
                            <Datepicker dark textInput v-model="form.expDate" :monthChangeOnScroll="false" :enableTimePicker="false" noToday hideOffsetDates hideInputIcon disabled/>
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
              <h2><icon class="fa-solid fa-shield-halved"/>&nbsp;&nbsp;Accreditations</h2>
            </div>
          </div>
        </div>
            <div class="row justify-content-evenly">
                          <div class="col-md-3">
                            <label style="padding-top: 5px;">Licenses Obtained</label>
                            <el-input type="textarea" autosize v-model="form.licenses" style="color:black" disabled/>
                          </div>

                          <div class="col-md-3">
                            <label style="padding-top: 5px;">Trainings Completed</label>
                            <el-input type="textarea" autosize v-model="form.trainings" style="color:black" disabled/>
                          </div>

                          <div class="col-md-3">
                            <label style="padding-top: 5px;">Seminars Attended</label>
                            <el-input type="textarea" autosize v-model="form.seminars" style="color:black" disabled/>
                          </div>
      </div>
    </div>
   </div>
  </div>

  <div class="container-xl"  style="padding-bottom:30px">
    <div class="card-responsive">
      <div class="card-wrapper">
        <div class="card-title">
          <div class="row">
            <div class="col-sm-6">
              <h2><icon class="fa-solid fa-address-card"/>&nbsp;&nbsp;Credentials</h2>
            </div>
          </div>
        </div>

            <div class="row justify-content-evenly">
              <div class="col-md-3">
                <label style="padding-top: 20px;">Email Address</label>
                <input v-model="form.email" type="email" style="color:black" disabled/>
              </div>                                  
            </div>

            <div class="flex justify-space-between mb-4 flex-wrap gap-4">
              <button class="btn btn-info mt-3" @click="$router.push('/guardsarchive')">
                Back to Archived Security Personnel
              </button>
                    
            </div>
  
      </div>
    </div>
  </div>
</form>
</template>

<style scoped>

.card-responsive {
    margin-top: 15px;
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