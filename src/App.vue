<template>
  <v-app id="app-bgc" class="app-background1">
    <AlertHelperVue />
    <NavigationBar />
    <v-main>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import NavigationBar from './components/Navigation/navigationBar.vue';
import AlertHelperVue from './components/Alerts/alertHelper.vue';
</script>

<style>
:root {
  --v-theme-error: 'blue';
}

.app-background1 {
  background-image: url('@/assets/1bg.jpg') !important;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.app-background2 {
  background-image: url('@/assets/2bg.jpg') !important;
  background-repeat: no-repeat;
  background-size: cover;
}

.app-background3 {
  background-image: url('@/assets/3bg.jpg') !important;
  background-repeat: no-repeat;
  background-size: cover;
}

.app-background4 {
  background-image: url('@/assets/4bg.jpg') !important;
  background-repeat: no-repeat;
  background-size: cover;
}

html {
  overflow-y: auto !important;
  overflow-x: auto !important;
  font-family: 'Lora' !important;
}

.v-row {
  width: 100%;
}
</style>
