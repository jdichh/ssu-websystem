<script>
import { useLoadEvents, deleteEvents } from '@/firebase' //refer to firebase/index.js

export default {
    setup() {
        const events = useLoadEvents()
        return { events, deleteEvents }
     },

    methods: {
      say: function (msg) {
        alert(msg)
      },
    }
}
</script>

<template>
  <main class="Calendar"> 
    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">

          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                
                <h2><i class="fa-solid fa-calendar-days"/>&nbsp;&nbsp;Scheduled Events</h2>
              </div>
              <div class="col-sm-6">
                <a>
                    <button class="btn btn-success" @click="$router.push('/add-event/')">
                        <i class="fa-solid fa-plus"/>
                        Add
                    </button>
                </a>
              </div>
            </div>
          </div>
          
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Event Description</th>
                      <th>Start</th>
                      <th>End</th>  
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody id="tbody1">
                    <tr v-for="{ id,  
                      description, 
                      eventStart,
                      eventEnd} in events" :key="id">
 
                      <td style="font-weight: bold; ">{{ description }}</td>	
                      <td>{{ eventStart.toDate().toLocaleString() }}</td> <!--toDate and toDateString converts timestamps to readable human text-->
                      <td>{{ eventEnd.toDate().toLocaleString() }}</td> <!--toDate and toDateString converts timestamps to readable human text-->

                      <td>
                        <el-button-group size="small">
                          <a class="edit" data-toggle="modal">
                              <router-link :to="`/edit-event/${id}`">
                                <el-button type="warning" v-on:click="say('You are about to VIEW/EDIT a record.')"> <!--EDIT-->
                                  <i class="fa-solid fa-user-pen" data-toggle="tooltip" title="Edit"> 
                                  </i>
                                </el-button>
                              </router-link>
                          </a>
                          <a class="delete" data-toggle="modal"> 
                            <el-button type="danger" @click="deleteEvents(id)"> <!--DELETE-->
                              <i class="fa-solid fa-trash" data-toggle="tooltip" title="Delete">
                              </i>
                            </el-button>
                          </a>
                        </el-button-group>
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
    width: 400px;
}
table.table tr th:last-child {
    width: 125px;
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
