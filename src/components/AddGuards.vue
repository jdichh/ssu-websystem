<template>
    <div class="card card-body mt-4">
      <h3>Edit Guard</h3>
      <form @submit.prevent="onSubmit">

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
          <label>Name Extension (if any)</label>
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
  
        <button type="submit" class="btn btn-success mt-3">
          Submit
        </button>
      </form>
    </div>
  </template>
  
<script>
import { createUser } from '@/firebase'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
  
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
  
    const onSubmit = async () => {
      await createUser({ ...form })
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
  
    return { form, onSubmit }
   }
}
</script>
  