<script>
import { useLoadUsers, deleteUser } from '@/firebase' //refer to firebase/index.js

export default {
    setup() {
        const users = useLoadUsers()
        return { users, 
          deleteUser }
     },

    methods: {
    say: function (msg) {
      alert(msg)
    }
  }
}
</script>

<template>
  <main class="Guard"> 
    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">

          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                <h2>Security Personnel</h2>
              </div>
              <div class="col-sm-6">
                <a>
                    <button class="btn btn-success" @click="$router.push('/add-guards')">
                        <i class="fa-solid fa-plus"/>
                        Add New Record
                    </button>
                </a>
              </div>
            </div>
          </div>
          
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">SSU ID</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">License Number</th>
                      <th scope="col">Date Issued</th> 
                      <th scope="col">Expiration Date</th> 
                      <th scope="col">Position</th>   
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody id="tbody1">
                    <tr v-for="{ id, 
                      idNum, 
                      lastName, 
                      firstName,
                      middleName,
                      nameEx,
                      conNumber, 
                      licNum,
                      issueDate,
                      expDate,
                      position } in users" :key="id">

                      <td style="font-weight:bold">{{ idNum }}</td>
                      <td>
                        {{ lastName + ", " + 
                            firstName + " " +
                            middleName + " " +
                            nameEx}}</td>
                      <td>{{ conNumber }}</td>	
                      <td>{{ licNum }}</td>
                      <td>{{ issueDate.toDate().toDateString() }}</td> <!--toDate and toDateString converts timestamps to readable human text-->
                      <td>{{ expDate.toDate().toDateString() }}</td>
                      <td>{{ position }}</td>

                      <td>
                        <a class="edit" data-toggle="modal">
                            <router-link :to="`/edit-guard/${id}`">
                              <button class="btn btn-info btn-sm" v-on:click="say('You are about to VIEW/EDIT a record.')"> <!--EDIT-->
                                <i class="fa-solid fa-user-pen" data-toggle="tooltip" title="Edit"> 
                                </i>
                              </button>
                            </router-link>
                        </a>

                        <a class="delete" data-toggle="modal"> 
                          <button class="btn btn-danger btn-sm" @click="deleteUser(id)"> <!--DELETE-->
                            <i class="fa-solid fa-trash" data-toggle="tooltip" title="Delete">
                            </i>
                          </button>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table> 
                 
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.table-responsive {
    margin-top: 30px;
}
.table-wrapper {
    background: rgb(235, 235, 235);
    padding: 20px 25px;
    border-radius: 3px;
    min-width: 1000px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {        
    padding-bottom: 15px;
    background: #1e2833;
    color: #fff;
    padding: 16px 30px;
    min-width: 100%;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}
.table-title h2 {
    margin: 5px 0 0;
    font-size: 30px;
    text-align: left;
}
.table-title .btn-group {
    float: left;
}
.table-title .btn {
    color: #fff;
    float: right;
    font-size: 15px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
}
.table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}
.table-title .btn span {
    float: left;
    margin-top: 2px;
}
table.table tr th, table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
    font-size: 15px;
}
table.table tr th:first-child {
    width: 11px;
}
table.table tr th:last-child {
    width: 130px;
}
table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fafafa;
}
table.table-striped.table-hover tbody {
    background: #f5f5f5;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}	
table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}
table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
    outline: none !important;
}
table.table td i {
    font-size: 19px;
}
</style>
