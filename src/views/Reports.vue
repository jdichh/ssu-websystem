<script>
import { useLoadReports, deleteReport } from '@/firebase' //refer to firebase/index.js

export default {
    setup() {
        const reports = useLoadReports()
        return { reports, deleteReport }
    },
}

</script>

<template>
  <main class="reports"> 
    <div class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2><icon class="fa-solid fa-file-lines"/>&nbsp;&nbsp;All Reports</h2>
                        </div>
                        <div class="col-sm-6">
                            <a>
                                <button class="btn btn-primary" @click="$router.push('/reportsarchive')">
                      Archive
                  </button>
                            </a>
                        </div>
                    </div>
                </div>
                

                <table class="table table-striped">
                  <thead>
                    <tr> 
                      <th>Date & Time</th>
                      <th>SSU ID</th>
                      <th>Reporter</th>
                      <th>Report Title</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="{ 
                        id,    
                        dateTime,
                        ssuID, 
                        fullName,  
                        eventTitle,
                        coords} in reports" :key="id">

                      <td v-if="dateTime == null">No Data</td>
                      <td v-else style="font-weight:bold">{{ dateTime.toDate().toLocaleString() }}</td>
                      <td v-if="ssuID == null">No Data</td>
                      <td v-else>{{ ssuID }}</td>
                      <td v-if="fullName == null">No Data</td>
                      <td v-else>{{ fullName }}</td>
                      <td v-if="eventTitle == null">No Data</td>
                      <td v-else>{{ eventTitle }}</td>

                      <td>
                        <button type="button" class="btn btn-primary btn-sm">
                            <a :href="`https://www.openstreetmap.org/search?query=${coords}#map=19/`" target="_blank" style="color:white">View Location</a>
                        </button>
                      </td>
                      <td>
                        <a class="edit">
                            <router-link :to="`/view-report/${id}`">
                            <button type="button" class="btn btn-info btn-sm" v-on:click="say('You are about to VIEW/EDIT a record.')"> <!--EDIT-->
                                <i class="fa-solid fa-file-lines"> 
                                </i>
                            </button>
                            </router-link>
                        </a>
                        <a class="delete"> 
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteReport(id)"> <!--DELETE-->
                                <i class="fa-solid fa-trash" title="Delete"/>
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

th {
  font-weight: bold;
}
</style>
