<template>
  <ToastBar />
  <navigationBarVue />
  <router-view />
</template>

<script setup lang="ts">
import navigationBarVue from '@/components/Navigation/navigationBar.vue';
import ToastBar from './components/Toast/toastBar.vue';
</script>

<style>
:root {
  --color-white: #fff;
  --background-color-success: rgba(30, 170, 30, 0.9);
  --background-color-warning: rgba(255, 153, 0, 0.6);
  --background-color-error: rgba(209, 36, 36, 0.9);
}

html {
  font-size: 16px;
}

body {
  padding: 0;
  margin: 0;
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Lora', sans-serif;
  color: var(--color-white);
  background-color: black;
}

.spacer {
  height: 1px;
  width: 100%;
  background-color: white;
  margin-bottom: 1rem;
}
</style>
