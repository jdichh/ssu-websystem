<script>
import { reactive, computed, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, updateUser } from '@/firebase'
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
        idNum: '',
        position: '',
        licNum: '',
        issueDate: '',
        expDate: '',
        licenses: '',
        seminars: '',
        trainings: '',
        email: '' })

    onMounted(async () => {
      const user = await getUser(userId.value)
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
      form.idNum = user.idNum
      form.position = user.position
      form.licNum = user.licNum
      form.issueDate = user.issueDate.toDate()
      form.expDate = user.expDate.toDate()
      form.licenses = user.licenses
      form.seminars = user.seminars
      form.trainings = user.trainings
      form.email = user.email
    })

    const update = async () => {
      await updateUser(userId.value, { ...form })
      router.push('/guards')
      form.lastName = ''
      form.firstName = ''
      form.middleName = ''
      form.nameEx = ''
      form.birthDate = ''
      form.sex = ''
      form.civStat = ''
      form.bloodType = ''
      form.height = ''
      form.weight = ''
      form.conNumber = ''
      form.landNumber = ''
      form.homeAdd = ''
      form.idNum = ''
      form.position = ''
      form.licNum = ''
      form.issueDate = ''
      form.expDate = ''
      form.licenses = ''
      form.seminars = ''
      form.trainings = ''
      form.email = ''
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
              <h2><icon class="fa-solid fa-clipboard-question"/>&nbsp;&nbsp;View/Edit Security Personnel</h2>
            </div>
          </div>

        </div>
        <form class="login" @submit.prevent="update">
          <p>Personal Information</p>
            <div class="row justify-content-evenly">
                            <div class="col-md-3 mb-2 pb-2">
                              <div>
                                <label>Last Name</label>
                                <input v-model="form.lastName" @keypress="validateText" style="color:black" required />
                              </div>
                            </div>

                            <div class="col-md-3 mb-1 pb-2">
                              <div>
                                <label>First Name</label>
                                <input v-model="form.firstName" @keypress="validateText" style="color:black" required />
                              </div>
                            </div>

                            <div class="col-md-3 mb-1 pb-2">
                              <div>
                                <label>Middle Name</label>
                                <input v-model="form.middleName" @keypress="validateText" style="color:black" placeholder="Optional"/>
                              </div>
                            </div>
                          
                            <div class="col-md-1 mb-2 pb-2">
                              <div>
                                <label>Suffix</label>
                                <input v-model="form.nameEx" @keypress="validateText" style="color:black" placeholder="Optional"/>
                              </div>
                            </div>

                          <div class="col-md-2 mb-2 pb-2">
                            <label style="padding-bottom: 5px;">Sex</label>
                              <select class="form-select" v-model="form.sex" style="color:black" required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                              <div>
                                <label>Height (cm)</label>
                                <input v-model="form.height" @keypress="validateNumber" maxlength="3" style="color:black"/>
                              </div>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                              <div>
                                <label>Weight (kg)</label>
                                <input v-model="form.weight" @keypress="validateNumber" maxlength="3" style="color:black"/>
                              </div>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                            <label style="padding-bottom: 5px;">Civil Status</label>
                              <select class="form-select" v-model="form.civStat" style="color:black">
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Separated">Separated</option>
                                <option value="Widowed">Widowed</option>
                              </select>
                          </div>

                          <div class="col-md-2 mb-2 pb-2">
                            <label style="padding-bottom: 5px;">Blood Type</label>
                              <select class="form-select" v-model="form.bloodType" style="color:black" >
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
                            <Datepicker dark textInput v-model="form.birthDate" :maxDate="new Date()" :monthChangeOnScroll="false" :enableTimePicker="false" noToday hideOffsetDates hideInputIcon required/>
                          </div>
                          
                          <div class="col-md-4">
                            <label style="padding-bottom: 5px;">Home Address</label>
                            <input v-model="form.homeAdd" required style="color:black"/>
                          </div>

          <p>Contact Information</p>

                          <div class="col-md-3">
                            <div>
                              <label style="padding-bottom: 5px;">Contact Number</label>
                              <input v-model="form.conNumber" @keypress="validateNumber" maxlength="11" style="color:black" required />
                            </div>
                          </div>

                          <div class="col-md-3"> <!--REVISIT-->
                            <div>
                              <label style="padding-bottom: 5px;">Landline Number</label>
                              <input v-model="form.landNumber" @keypress="validateNumber" maxlength="10" style="color:black" required />
                            </div>
                          </div>

          <p>Work Information</p>

                          <div class="col-md-2"> <!--DROPDOWN-->
                            <div>
                              <label style="padding-bottom: 5px;">Position</label>
                              <input v-model="form.position" @keypress="validateText" style="color:black" required />
                            </div>
                          </div>

                          <div class="col-md-2">
                            <div>
                              <label style="padding-bottom: 5px;">SSU ID</label>
                            <input v-model="form.idNum" @keypress="validateNumber" style="color:black" required />
                            </div>
                          </div>

                          <div class="col-md-2">
                            <div>
                              <label style="padding-bottom: 5px;">License Number</label>
                              <input v-model="form.licNum" @keypress="validateNumber" style="color:black" required />
                            </div>
                          </div>

                          <div class="col-md-2">
                            <!-- :maxDate="new Date()" -->
                            <label style="padding-bottom: 12px;">Date Issued</label>
                            <Datepicker dark textInput v-model="form.issueDate" :monthChangeOnScroll="false" :enableTimePicker="false" noToday hideOffsetDates hideInputIcon required/>
                          </div>

                          <div class="col-md-2">
                            <!-- :minDate="new Date()" -->
                            <label style="padding-bottom: 12px;">Expiry Date</label>
                            <Datepicker dark textInput v-model="form.expDate" :monthChangeOnScroll="false" :enableTimePicker="false" noToday hideOffsetDates hideInputIcon required />
                          </div>

          <p>Accreditations</p>
                          
                          <div class="col-md-3">
                            <label style="padding-bottom: 5px;">Licenses Attained</label>
                            <el-input type="textarea" autosize v-model="form.licenses" style="color:black"/>
                          </div>

                          <div class="col-md-3">
                            <label style="padding-bottom: 5px;">Trainings Completed</label>
                            <el-input type="textarea" autosize v-model="form.trainings" style="color:black"/>
                          </div>

                          <div class="col-md-3">
                            <label style="padding-bottom: 5px;">Seminars Attended</label>
                            <el-input type="textarea" autosize v-model="form.seminars" style="color:black"/>
                          </div>

          <p>Credentials</p>

                          <div class="col-md-3">
                            <label style="padding-bottom: 5px;">Email Address</label>
                            <input v-model="form.email" type="email" style="color:black" required/>
                          </div>        
                         
            </div>

            <button class="btn btn-danger mt-3" @click="$router.push('/guards')">
              Cancel Edit
            </button>
                  
            <button type="submit" class="btn btn-success mt-3">
              Confirm Edit
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