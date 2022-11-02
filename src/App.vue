<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Sidebar from './components/sidebar/Sidebar.vue'
import { sidebarWidth } from './components/sidebar/state'


export default {

  data() {
    return {
      mobile: null,
    }
  },

  components: {
    Sidebar
  },

  created () {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen)
  },

  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 850) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    }
  },

  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    return { sidebarWidth }
  },

  
}
</script>

<style lang="scss">

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body{
  background: url(./assets/img/bg_color.png);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

.mobile-message {
  padding-top: 50%;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #434A52;
  color: #fff;

  p {
    margin-top: 16px;
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div v-if="!mobile">
    <Sidebar/>
      <div :style="{ 'margin-left': sidebarWidth}">
      </div>
    <router-view/>
  </div>
  <div v-else class="mobile-message flex flex-column">
    <h2>Sorry, this cannot be viewed on mobile devices or low resolution monitors.</h2>
    <p>To use this, please use a device that has a high resolution display.</p>
  </div>
</template>