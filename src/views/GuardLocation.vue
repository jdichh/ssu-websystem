<script>
import { useLoadGuardLocation, deleteGuardLocation} from '@/firebase' //refer to firebase/index.js

export default {
    setup() {
      const guardLocation = useLoadGuardLocation()
      return { guardLocation, deleteGuardLocation }
    }
}
</script>

<template>
    <main class="Home"> 
      
      <div class="container">
        <div class="table-responsive">
          <div class="table-wrapper">
  
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2><i class="fa-solid fa-location-crosshairs"/>&nbsp;&nbsp;Patrolling Status</h2>
                </div>
              </div>
            </div>
            
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>  
                      </tr>
                    </thead>
  
                    <tbody id="tbody1">
                      <tr v-for="{ id,  
                        firstName, 
                        middleName,
                        lastName,
                        locUpdate,
                        timeStamp} in guardLocation" :key="id">
   
                        <td v-if="timeStamp == null">No Data</td>
                        <td v-else style="font-weight: bold; ">{{ timeStamp.toDate().toLocaleString() }}</td>	
                        <td v-if="lastName && firstName && middleName == null">No Data</td>
                        <td v-else>{{ lastName + ", " + firstName + " " + middleName}}</td>
                        <td v-if="locUpdate == null">No Data</td>
                        <td v-else>{{ locUpdate }}</td>
                        <td>
                            <a class="delete"> 
                              <button type="button" class="btn btn-primary btn-sm" @click="deleteGuardLocation(id)"> <!--DELETE-->
                                <i class="fa-solid fa-circle-check"/>
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
  .table-wrapper2 {
      padding: 20px 25px;
      border-radius: 10px;
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
  .table-title2 {        
      padding-bottom: 15px;
      background: #1e2833;
      color: #fff;
      padding: 16px 30px;
      min-width: 100%;
      margin: -20px -25px 10px;
      border-radius: 3px;
      text-align: left;
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
      padding: 6px 15px;
      vertical-align: middle;
      font-size: 16px;
  }
  table.table tr th:first-child {
      width: 250px;
  }
  table.table tr th:last-child {
      width: 150px;
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
  
  th {
    font-weight: bold;
  }
  </style>
  
