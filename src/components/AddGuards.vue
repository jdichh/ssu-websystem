<template>
    <div class="card card-body mt-4">
      
      <h1>Guard Information</h1>

      <form @submit.prevent="onSubmit">

        <div class="form-group">
          <label>ID Number</label>
          <input v-model="form.idNum" class="form-control" required />
        </div>

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

        <div class="form-group mt-3">
          <label>Email</label>
          <input
            v-model="form.email"
            class="form-control"
            type="email"
            required
          />
        </div>

        <div class="form-group mt-3">
          <label>Password</label>
          <input
            v-model="form.password"
            class="form-control"
            type="password"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-success mt-3">
          Create User
        </button>
      </form>
    </div>
  </template>
  
<script>
import { createUser } from '@/firebase'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
  
  export default {
    setup() {

      const router = useRouter()

      const form = reactive({
        idNum: '', 
        lastName: '',
        firstName: '',
        middleName: '', 
        nameEx: '',
        email: '',
        password: ''})
  
      const onSubmit = async () => {
        await createUser({ ...form })
        router.push('/guards')
        form.idNum = ''
        form.lastName = ''
        form.firstName = ''
        form.middleName = ''
        form.nameEx = ''
        form.email = ''
        form.password = ''
      }
  
      return { form, onSubmit }
    }
  }
  </script>
  