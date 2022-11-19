<script>
import { useLoadUsersArhived, deleteUserArchived } from '@/firebase' //refer to firebase/index.js

export default {
    setup() {
        const users = useLoadUsersArhived()
        return { users, deleteUserArchived }
     },

    methods: {
      say: function (msg) {
        alert(msg)
        },
      },
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
                <h2><icon class="fa-solid fa-person-military-pointing"/>&nbsp;&nbsp;Security Personnel [ARCHIVED]</h2>
              </div>
              <div class="col-sm-6">
                <a>
                  <button class="btn btn-primary" @click="$router.push('/guards')">
                      Back
                  </button>
                </a>
              </div>
            </div>
          </div>
          
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>SSU ID</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Contact Number</th>
                      <th>License Number</th>
                      <th>Date Issued</th> 
                      <th>Expiration Date</th> 
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody id="tbody1">
                    <tr v-for="{ id, 
                      ssuID, 
                      lastName, 
                      firstName,
                      middleName,
                      nameEx,
                      conNumber, 
                      licNum,
                      issueDate,
                      expDate,
                      position } in users" :key="id">

                      <td v-if="ssuID == null">No Data</td>
                      <td v-else style="font-weight:bold">{{ ssuID }}</td>
                      <td v-if="lastName && firstName && middleName && nameEx == null">No Data</td>
                      <td v-else>{{ lastName + ", " + firstName + " " + middleName + " " + nameEx}}</td>
                      <td v-if="position == null">No Data</td>
                      <td v-else>{{ position }}</td>
                      <td v-if="conNumber == null">No Data</td>
                      <td v-else>{{ conNumber }}</td>	
                      <td v-if="licNum == null">No Data</td>
                      <td v-else>{{ licNum }}</td>
                      <td v-if="issueDate == null">No Data</td>
                      <td v-else>{{ issueDate.toDate().toLocaleDateString() }}</td>
                      <td v-if="expDate == null">No Data</td>
                      <td v-else>{{ expDate.toDate().toLocaleDateString() }}</td>                

                      <td>
                          <a class="edit">
                              <router-link :to="`/viewarchivedguard/${id}`">
                                <button type="button" class="btn btn-info btn-sm" v-on:click="say('You are about to VIEW an archived record.')"> <!--EDIT-->
                                  <i class="fa-solid fa-eye"/> 
                                </button>
                              </router-link>
                          </a>
                          <a class="delete"> 
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteUserArchived(id)"> <!--DELETE-->
                              <i class="fa-solid fa-trash"/>
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
    margin-top: 15px;
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
    margin-right: 10px;
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
    padding: 6px 15px;
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

th{
  font-weight: bold;
}
</style>
