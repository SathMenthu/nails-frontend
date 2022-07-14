<template>
  <div class="toast-container">
    <div class="toast-box" ref="toastBox">
      <p class="toast-text">{{ toastMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const toastBox = ref<HTMLBaseElement>();
const toastMessage = ref('');
const toastAlert = ref('');

watchEffect(() => {
  if (store.getters.toastMessage) {
    toastMessage.value = store.getters.toastMessage;
    toastAlert.value = store.getters.toastAlert;
    if (toastBox.value) {
      toastBox.value.style.display = 'inline';
      switch (toastAlert.value) {
        case 'Success':
          toastBox.value.style.backgroundColor = 'var(--background-color-success)';
          break;
        case 'Warning':
          toastBox.value.style.backgroundColor = 'var(--background-color-warning)';
          break;
        case 'Error':
          toastBox.value.style.backgroundColor = 'var(--background-color-error)';
          break;
        default:
          break;
      }
    }

    setTimeout(() => {
      if (toastMessage.value !== '') {
        if (toastBox.value) {
          toastBox.value.style.display = 'none';
        }
        store.state.toastMessage = '';
      }
    }, 3000);
  }
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1rem;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast-container .toast-box {
  display: none;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 1rem;
}
.toast-container .toast-text {
  padding: 0 2rem;
  margin: 0;
  box-sizing: border-box;
  font-size: 1.2rem;
}
</style>
