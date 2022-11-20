<script>
import SidebarLink from './SidebarLinks.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'; // ./state is state.js in components/sidebar/state.js

export default {

    props: {},

    components: { 
        SidebarLink 
    },

    setup () {
        return { 
            collapsed, 
            toggleSidebar, 
            sidebarWidth }
    }
}

</script>

<template>
    <div class="sidebar" :style="{ width:sidebarWidth }" v-if="$store.state.user"> <!--store.state.user checks if the user is logged in for the sidebar to display, refer to store/index.js file-->
        <h1>
            <span v-if="collapsed">
                <div class="sidebar_img">
                    <img src="../letran_calamba_seal_title.png"/>
                </div>
            </span>

            <span v-else>
                <div class="sidebar_img">
                    <img src="../letran_calamba_seal_title.png"/>
                </div>
            </span>
        </h1>
        
        <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
        <SidebarLink to="/reports" icon="fas fa-file-lines">Reports</SidebarLink>
        <SidebarLink to="/guardlocation" icon="fa-solid fa-location-crosshairs">Patrolling Status</SidebarLink>
        <SidebarLink to="/guards" icon="fa-solid fa-person-military-pointing">Guards</SidebarLink>
        <SidebarLink to="/dtr" icon="fas fa-clock">Daily Time Record</SidebarLink>  
        <SidebarLink to="/events" icon="fas fa-calendar-days">Events</SidebarLink>  
        <SidebarLink to="/logout" icon="fa-solid fa-arrow-right-from-bracket" class="logout" @click="$store.dispatch('logout')">Log Out</SidebarLink>

        <!--<span class="collapse-icon" :class="{ 'rotate-180': collapsed}" @click="toggleSidebar">
            <i class="fa-solid fa-expand"></i>
        </span>-->
    </div>
</template>

<style>
:root {
    --sidebar-bg-color: #1e2833;
    --sidebar-item-hover: #434a52;
    --sidebar-item-active: #0c1014;
}
</style>

<style scoped>
.sidebar{
    color: white;
    background-color: var(--sidebar-bg-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    font-size:17px;
}

.logout{
    display:flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin-top: 350px;
    padding: 0.4em;
    border-radius: 0.25em;
    height: 4em;

    color: white;
    text-decoration: none;
}


.collapse-icon{
    position: absolute;
    bottom: 0;
    padding: 0.5em;
    margin-left: 3px;
    margin-bottom: 5px;
    color: white;
    transition: 0.2s linear;
}

.sidebar_img{
    margin-left: 2.5px;
}
.rotate-180{
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>