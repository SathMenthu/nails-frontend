<template>
  <v-row>
    <v-col></v-col>
    <v-col>
      <v-img
        v-if="loginMenu"
        class="text-center mb-16 mt-5"
        width="100%"
        hight="100%"
        src="@/assets/logo_white.png"
      ></v-img>
      <LoginPanelVue @toggleLogReg="toggleLogRegf()" v-if="loginMenu" />
      <RegisterPanelVue @toggleLogReg="toggleLogRegf()" v-if="!loginMenu" />
    </v-col>
    <v-col></v-col>
  </v-row>
</template>

<script setup>
import LoginPanelVue from '@/components/Panels/loginPanel.vue';
import RegisterPanelVue from '@/components/Panels/registerPanel.vue';
import { onBeforeMount, ref, defineEmits } from 'vue';
const loginMenu = ref(true);

defineEmits(['toggleLogReg']);
function toggleLogRegf() {
  loginMenu.value = !loginMenu.value;
}

onBeforeMount(() => {
  const doc = document.getElementById('app-bgc');
  doc.classList.add('app-background3');
  doc.classList.remove('app-background2');
  doc.classList.remove('app-background1');
  doc.classList.remove('app-background4');
  doc.classList.remove('app-background5');
});
</script>
