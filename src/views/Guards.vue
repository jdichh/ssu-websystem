<template>
  <main class="Guard"> 
    <button @click="$router.push('/add-guards')">Add Guards</button>

    <div class="table-responsive">
    <table class="table table-sm table-dark table-striped">
      
      <thead>
        <tr>
          <th scope="col">ID Number</th>
          <th scope="col">Full Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="{ id, 
          idNum, 
          lastName, 
          firstName,
          middleName, 
          nameEx, 
          email } in users" :key="id">

          <td>{{ idNum }}</td>
          <td>{{ lastName + ", " + 
                 firstName + " " +
                 middleName + " " +
                 nameEx}}</td>
          <td>{{ email }}</td>

          <td>
            <router-link :to="`/edit-guard/${id}`">
              <button class="btn btn-primary btn-sm me-2">
                View/Edit
              </button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteUser(id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  </main>
</template>

<script>
import { useLoadUsers, deleteUser } from '@/firebase'

export default {
  setup() {
    const users = useLoadUsers()
    return { users, deleteUser }
  }
}
</script>

