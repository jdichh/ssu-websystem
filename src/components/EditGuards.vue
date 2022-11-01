<template>
  <div class="card card-body mt-4">
    <h3>Edit Guard</h3>
    <form @submit.prevent="update">

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
            type="text"
            required
          />
        </div>

      <button type="submit" class="btn btn-primary  mt-3">
        Update
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, updateUser } from '@/firebase'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)

    const form = reactive({ 
        idNum: '',
        lastName: '',
        firstName: '',
        middleName: '', 
        nameEx: '',
        email: '',
        password: '' })

    onMounted(async () => {
      const user = await getUser(userId.value)
      console.log(user, userId.value)
      form.idNum = user.idNum
      form.lastName = user.lastName
      form.firstName = user.firstName
      form.middleName = user.middleName
      form.nameEx = user.nameEx
      form.email = user.email
      form.password = user.password
    })

    const update = async () => {
      await updateUser(userId.value, { ...form })
      router.push('/guards')
      form.idNum = ''
      form.lastName = ''
      form.firstName = ''
      form.middleName = ''
      form.nameEx = ''
      form.email = ''
      form.password = ''
    }

    return { form, update }
  }
}
</script>
