<script>
import { useLatestReports } from '@/firebase' //refer to firebase/index.js

export default {
    
    setup() {
        const reports = useLatestReports()
        return { reports }
     }
}
</script>

<template>
  <main class="Home"> 

    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">

                <div class="table-title">
                  <div class="row">
                    <div class="col-sm-6">
                      <h2><icon class="fa-solid fa-person-military-pointing"/>&nbsp;&nbsp;Currently On Patrol</h2>
                    </div>
                  </div>
                </div>

                <table class="table table-striped">
                  <thead>
                    <tr> 
                      <th scope="col">Full Name</th>
                      <th scope="col">Current Coordinates</th>
                    </tr>
                  </thead>

                  <!--<tbody>
                    <tr v-for="{ 
                        id,
                        dateTime, 
                        lastName, 
                        firstName,
                        middleName, 
                        eventType,
                        eventDetails,
                        location} in reports" :key="id">

                      <td>{{ dateTime.toDate() }}</td>
                      <td>{{ lastName.toUpperCase() + " " + firstName}}</td>
                      <td>{{ eventType }}</td>
                      <td>{{ eventDetails }}</td>
                      <td>{{ location }}</td>
                    </tr>
                  </tbody>-->
                </table> 

        </div>
      </div>
    </div>

    <div class="container">
      <div class="table-responsive">
        <div class="table-wrapper">

                <div class="table-title">
                  <div class="row">
                    <div class="col-sm-6">
                      <h2><icon class="fa-solid fa-clipboard"/>&nbsp;&nbsp;Last 5 Reports</h2>
                    </div>
                  </div>
                </div>

                <table class="table table-striped">
                  <thead>
                    <tr> 
                      <th scope="col">Date & Time Reported</th>
                      <th scope="col">Reporter</th>
                      <th scope="col">Event Details</th>
                      <th scope="col">Location</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="{ 
                        id,
                        dateTime, 
                        lastName, 
                        firstName,
                        middleName, 
                        eventDetails,
                        coords} in reports" :key="id">

                      <td style="font-weight:bold">{{ dateTime.toDate().toLocaleString() }}</td>
                      <td>{{ lastName.toUpperCase() + " " + firstName + " " + middleName}}</td>
                      <td>{{ eventDetails }}</td>
                      <td><a :href="`https://www.openstreetmap.org/search?query=${coords.latitude}%2C${coords.longitude}#map=18/${coords.latitude}/${coords.longitude}`" target="_blank">View</a></td>
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
    padding: 6px 15px;
    vertical-align: middle;
    font-size: 17px;
}
table.table tr th:first-child {
    width: 250px;
}
table.table tr th:last-child {
    width: 350px;
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
