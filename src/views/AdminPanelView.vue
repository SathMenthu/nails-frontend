<template>
  <v-container
    v-if="permissions.filter((permission) => permission === 'ADMIN').length"
  >
    <v-row justify="center" class="mt-10 ml-15">
      <v-col cols="2">
        <v-btn
          @click="tooglePanel('confirm-order-visit-panel')"
          x-large
          outlined
          elevation="3"
          class="confirm-order-visit-panel-button"
          >Lista Wizyt</v-btn
        >
      </v-col>
      <v-col cols="2"
        ><v-btn
          @click="tooglePanel('tariff-panel')"
          x-large
          outlined
          elevation="3"
          class="tariff-panel-button"
          >Cennik</v-btn
        ></v-col
      >
    </v-row>

    <v-row justify="center">
      <v-col cols="4">
        <TariffPanel v-if="tariffPanel" />
        <ConfirmVisitListPanelVue v-if="confirmVisitPanel" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import TariffPanel from '@/components/Panels/tariffPanel.vue';
import ConfirmVisitListPanelVue from '@/components/Panels/confirmVisitListPanel.vue';

const store = useStore();
const permissions = ref([]);
const confirmVisitPanel = ref(false);
const tariffPanel = ref(true);

const isLoggedIn = computed(() => store.getters.isLoggedIn);
if (isLoggedIn.value) {
  permissions.value = store.getters.userData.permissions;
}

function tooglePanel(panelName) {
  switch (panelName) {
    case 'confirm-order-visit-panel':
      tariffPanel.value = false;
      confirmVisitPanel.value = true;
      break;
    case 'tariff-panel':
      confirmVisitPanel.value = false;
      tariffPanel.value = true;
      break;
    default:
      break;
  }
}
</script>

<style>
.confirm-order-visit-panel-button,
.tariff-panel-button {
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-right: 0px;
}
.confirm-order-visit-panel-button {
  background-color: rgb(17, 163, 17);
}

.confirm-order-visit-panel-button:hover {
  background-color: rgba(17, 163, 17, 0.479);
}

.tariff-panel-button {
  background-color: rgb(163, 141, 17);
}

.tariff-panel-button:hover {
  background-color: rgba(163, 141, 17, 0.479);
}
</style>
