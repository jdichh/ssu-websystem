<template>
  <div class="card card-body mt-4">
    <h3>Edit Guard</h3>
    <form @submit.prevent="update">
        
      <h4>Personal Information</h4>

        <div class="form-group">
          <label>Last Name</label>
          <input v-model="form.lastName" class="form-control" required />
        </div>

        <div class="form-group">
          <label>First Name</label>
          <input v-model="form.firstName" class="form-control" required />
        </div>

        <div class="form-group">
          <label>Middle Name</label>
          <input v-model="form.middleName" class="form-control"/>
        </div>
  
        <div class="form-group">
          <label>Name Extension</label>
          <input v-model="form.nameEx" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Date of Birth</label>
          <Datepicker v-model="form.birthDate" required />
        </div>

        <div class="form-group">
          <label>Sex</label>
          <input v-model="form.sex" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Civil Status</label>
          <input v-model="form.civStat" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Blood Type</label>
          <input v-model="form.bloodType" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Contact Number</label>
          <input v-model="form.conNumber" @keypress="validateNumber" maxlength="11" class="form-control" required />
        </div>

        <div class="form-group mt-3">
          <label>Home Address</label>
          <input v-model="form.homeAdd" class="form-control" required/>
        </div>

      <h4>Work Information</h4>

        <div class="form-group">
          <label>SSU ID</label>
          <input v-model="form.idNum" @keypress="validateNumber" class="form-control" required />
        </div>

        <div class="form-group">
          <label>Position</label>
          <input v-model="form.position" class="form-control" required />
        </div>

        <div class="form-group">
          <label>License Number</label>
          <input v-model="form.licNum" @keypress="validateNumber" class="form-control" required />
        </div>

        <div class="form-group">
          <label>Date Issued</label>
          <Datepicker v-model="form.issueDate" required />
        </div>

        <div class="form-group">
          <label>Expiry Date</label>
          <Datepicker v-model="form.expDate" required />
        </div>

        <h4>Credentials</h4>

        <div class="form-group mt-3">
          <label>Email Address</label>
          <input v-model="form.email" class="form-control" type="email" required/>
        </div>
        
        <div class="form-group mt-3">
          <label>Password</label>
          <input v-model="form.password" class="form-control" type="text" required/>
        </div>

      <button type="submit" class="btn btn-primary  mt-3">
        Submit
      </button>

    </form>
  </div>
</template>


<script>
import { reactive, computed, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, updateUser } from '@/firebase'
import '@vuepic/vue-datepicker/dist/main.css'

export default {

  methods: {

    validateNumber: (event) => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
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
        conNumber: '',
        homeAdd: '',
        idNum: '',
        position: '',
        licNum: '',
        issueDate: '',
        expDate: '',
        password: '',
        email: '' })

    onMounted(async () => {
      const user = await getUser(userId.value)
      console.log(user, userId.value)
      form.lastName = user.lastName
      form.firstName = user.firstName
      form.middleName = user.middleName
      form.nameEx = user.nameEx
      form.birthDate = user.birthDate.toDate()
      form.sex = user.sex
      form.civStat = user.civStat
      form.bloodType = user.bloodType
      form.conNumber = user.conNumber
      form.homeAdd = user.homeAdd
      form.idNum = user.idNum
      form.position = user.position
      form.licNum = user.licNum
      form.issueDate = user.issueDate.toDate()
      form.expDate = user.expDate.toDate()
      form.email = user.email
      form.password = user.password
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
      form.conNumber = ''
      form.homeAdd = ''
      form.idNum = ''
      form.position = ''
      form.licNum = ''
      form.issueDate = ''
      form.expDate = ''
      form.email = ''
      form.password = ''
    }

    return { form, update }
   
  }
}

</script>
