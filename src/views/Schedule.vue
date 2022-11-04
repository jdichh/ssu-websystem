<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: { VueCal },

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
                <h2>Calendar</h2>
              </div>
            </div>
          </div>
          <vue-cal class="vuecal--blue-theme vuecal--rounded-theme" :time="false" active-view="month" :disable-views="['years', 'year', 'week',]" style="height:82vh" />
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

</style>
