<template>
  <div id="app">
    <md-app>
      <md-app-toolbar class="md-primary md-layout">
       <md-button class="md-icon-button" @click="localShowNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
        <h1 class="md-title md-layout-item md-toolbar-section-start"> {{ message }} </h1>
      <div class="md-layout-item md-toolbar-section-end">
         <md-button class="md-icon-button  md-dense md-raised" @click="showDialog = true"></md-button>
      </div>
      </md-app-toolbar>
       <md-app-drawer :md-active.sync="localShowNavigation" md-swipeable>
          <sidebar></sidebar>
       </md-app-drawer>
       <md-app-content>
      <router-view @updateStatus="localShowNavigation = false"></router-view>
       </md-app-content>
    </md-app>
  </div>
</template>

<script>

import Sidebar from './components/Sidebar.vue'
import Hello from './components/Hello'

export default {
  name: 'App',
  data () {
    return {
      message: 'Local landing pages list',
      localShowNavigation: false
    }
  },
  components: { Hello, Sidebar },
  watch: {
    $route (to, from) {
      this.localShowNavigation = false
    }
  }
}
</script>
