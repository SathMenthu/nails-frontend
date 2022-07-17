<template>
  <v-container>
    <v-row justify="center" class="mt-10 ml-15">
      <v-col
        cols="2"
        v-if="permissions.filter((permission) => permission === 'USER').length"
      >
        <v-btn
          @click="tooglePanel('order-visit-panel')"
          x-large
          outlined
          elevation="3"
          class="order-visit-panel-button"
          >Umów Wizytę</v-btn
        >
      </v-col>
      <v-col cols="2"
        ><v-btn
          @click="tooglePanel('vist-list-panel')"
          x-large
          outlined
          elevation="3"
          class="visit-list-panel-button"
          >Lista Wizyt</v-btn
        ></v-col
      >
      <v-col cols="2"
        ><v-btn
          @click="tooglePanel('user-data-panel')"
          x-large
          outlined
          elevation="3"
          class="user-data-panel-button"
          >Twoje dane</v-btn
        ></v-col
      >
    </v-row>

    <v-row justify="center">
      <v-col cols="4">
        <OrderVisitPanelVue v-if="orderVisitPanel" />
        <VisitListPanelVue v-if="visitListPanel" />
        <UserData v-if="userDataPanel" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import OrderVisitPanelVue from '@/components/Panels/orderVisitPanel.vue';
import VisitListPanelVue from '@/components/Panels/visitListPanel.vue';
import UserData from '@/components/Panels/userDataPanel.vue';

const store = useStore();
const permissions = ref([]);
const orderVisitPanel = ref(true);
const userDataPanel = ref(false);
const visitListPanel = ref(false);

const isLoggedIn = computed(() => store.getters.isLoggedIn);
if (isLoggedIn.value) {
  permissions.value = store.getters.userData.permissions;
}

function tooglePanel(panelName) {
  switch (panelName) {
    case 'order-visit-panel':
      userDataPanel.value = false;
      visitListPanel.value = false;
      orderVisitPanel.value = true;
      break;
    case 'vist-list-panel':
      orderVisitPanel.value = false;
      userDataPanel.value = false;
      visitListPanel.value = true;
      break;
    case 'user-data-panel':
      orderVisitPanel.value = false;
      visitListPanel.value = false;
      userDataPanel.value = true;
      break;

    default:
      break;
  }
}
</script>

<style>
.order-visit-panel-button,
.visit-list-panel-button,
.user-data-panel-button {
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-right: 0px;
}
.order-visit-panel-button {
  background-color: rgb(17, 163, 17);
}

.order-visit-panel-button:hover {
  background-color: rgba(17, 163, 17, 0.479);
}

.visit-list-panel-button {
  background-color: rgb(163, 141, 17);
}

.visit-list-panel-button:hover {
  background-color: rgba(163, 141, 17, 0.479);
}

.user-data-panel-button {
  background-color: rgb(163, 83, 17);
}

.user-data-panel-button:hover {
  background-color: rgba(163, 83, 17, 0.479);
}
</style>
