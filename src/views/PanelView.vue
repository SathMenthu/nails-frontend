<template>
  <section class="container">
    <div class="panels">
      <span v-if="permissions.filter((permission) => permission === RolesEnum.USER).length"
        ><button @click="enableClientPanel()" ref="userPanelButton" class="active">
          Panel Klienta
        </button></span
      >
      <span v-if="permissions.filter((permission) => permission === RolesEnum.ADMIN).length"
        ><button @click="enableAdminPanel()" ref="adminPanelButton">Admin Panel</button></span
      >
    </div>
    <div class="card" v-if="userPanel">
      <div class="catagories">
        <button
          class="active-small"
          ref="orderVisitPanelButton"
          @click="changePanel('orderVisitPanel')"
        >
          Umów Wizytę
        </button>
        <button ref="visitListPanelButton" @click="changePanel('visitListPanel')">
          Twoje Wizyty
        </button>
        <button ref="userDataPanelButton" @click="changePanel('userDataPanel')">Twoje Dane</button>
      </div>
      <div class="spacer"></div>
      <div class="table">
        <UserData :userData="store.getters.userData" v-if="userDataPanel" />
        <OrderVisit :userData="store.getters.userData" v-if="orderVisitPanel" />
        <VisitList :userData="store.getters.userData" v-if="visitListPanel" />
      </div>
    </div>
    <div class="card" v-if="adminPanel">
      <div class="catagories">
        <button
          class="active-small"
          ref="confirmVisitPanelButton"
          @click="changePanel('confirmVisitPanel')"
        >
          Panel Wizyt
        </button>
        <button ref="tarrifListPanelButton" @click="changePanel('tarrifListPanel')">Cennik</button>
      </div>
      <div class="spacer"></div>
      <div class="table">
        <ConfirmVisitPanel :userData="store.getters.userData" v-if="confirmVisitPanel" />
        <TariffPanel :userData="store.getters.userData" v-if="tarrifListPanel" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import UserData from '@/components/Panels/userData.vue';
import OrderVisit from '@/components/Panels/orderVisit.vue';
import ConfirmVisitPanel from '@/components/Panels/confirmVisitPanel.vue';
import TariffPanel from '@/components/Panels/tariffPanel.vue';
import VisitList from '@/components/Panels/visitList.vue';
import { RolesEnum } from '@/types';

const store = useStore();
const permissions = ref<RolesEnum[]>([]);
const userDataPanel = ref(false);
const orderVisitPanel = ref(true);
const confirmVisitPanel = ref(true);
const visitListPanel = ref(false);
const tarrifListPanel = ref(false);
const userPanel = ref(true);
const adminPanel = ref(false);
const userPanelButton = ref<HTMLElement | null>(null);
const adminPanelButton = ref<HTMLElement | null>(null);
const orderVisitPanelButton = ref<HTMLElement | null>(null);
const visitListPanelButton = ref<HTMLElement | null>(null);
const userDataPanelButton = ref<HTMLElement | null>(null);
const confirmVisitPanelButton = ref<HTMLElement | null>(null);
const tarrifListPanelButton = ref<HTMLElement | null>(null);

const isLoggedIn = computed(() => store.getters.isLoggedIn);
if (isLoggedIn.value) {
  permissions.value = store.getters.userData.permissions;
}

function changePanel(panelName: string) {
  switch (panelName) {
    case 'userDataPanel':
      userDataPanel.value = true;
      orderVisitPanel.value = false;
      visitListPanel.value = false;
      userDataPanelButton.value?.classList.add('active-small');
      orderVisitPanelButton.value?.classList.remove('active-small');
      visitListPanelButton.value?.classList.remove('active-small');
      confirmVisitPanelButton.value?.classList.remove('active-small');
      tarrifListPanelButton.value?.classList.remove('active-small');
      break;
    case 'orderVisitPanel':
      orderVisitPanel.value = true;
      userDataPanel.value = false;
      visitListPanel.value = false;
      userDataPanelButton.value?.classList.remove('active-small');
      visitListPanelButton.value?.classList.remove('active-small');
      confirmVisitPanelButton.value?.classList.remove('active-small');
      tarrifListPanelButton.value?.classList.remove('active-small');
      orderVisitPanelButton.value?.classList.add('active-small');
      break;
    case 'visitListPanel':
      visitListPanel.value = true;
      orderVisitPanel.value = false;
      userDataPanel.value = false;
      userDataPanelButton.value?.classList.remove('active-small');
      orderVisitPanelButton.value?.classList.remove('active-small');
      confirmVisitPanelButton.value?.classList.remove('active-small');
      tarrifListPanelButton.value?.classList.remove('active-small');
      visitListPanelButton.value?.classList.add('active-small');
      break;
    case 'confirmVisitPanel':
      confirmVisitPanel.value = true;
      tarrifListPanel.value = false;
      userDataPanelButton.value?.classList.remove('active-small');
      orderVisitPanelButton.value?.classList.remove('active-small');
      tarrifListPanelButton.value?.classList.remove('active-small');
      visitListPanelButton.value?.classList.remove('active-small');
      confirmVisitPanelButton.value?.classList.add('active-small');
      break;
    case 'tarrifListPanel':
      tarrifListPanel.value = true;
      confirmVisitPanel.value = false;
      userDataPanelButton.value?.classList.remove('active-small');
      orderVisitPanelButton.value?.classList.remove('active-small');
      visitListPanelButton.value?.classList.remove('active-small');
      confirmVisitPanelButton.value?.classList.remove('active-small');
      tarrifListPanelButton.value?.classList.add('active-small');
      break;
    default:
      break;
  }
}

function enableClientPanel() {
  userPanel.value = true;
  adminPanelButton.value?.classList.remove('active');
  userPanelButton.value?.classList.add('active');
  adminPanel.value = false;
}

function enableAdminPanel() {
  userPanel.value = false;
  userPanelButton.value?.classList.remove('active');
  adminPanelButton.value?.classList.add('active');
  adminPanel.value = true;
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/5bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.container .card {
  background-color: rgb(228, 163, 173);
  width: 60vw;
  height: 70vh;
  border: solid 1px rgb(255, 255, 255);
  box-shadow: 1px 1px 5px rgb(255, 255, 255);
}

.container .panels :nth-child(1) {
  margin-right: 1rem;
}
.container .panels span button {
  text-transform: uppercase;
  font-size: 1.8rem;
  padding: 0;
  border: 0;
  background-color: transparent;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
}

.container .card .catagories {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .card .catagories button {
  padding: 1rem 5rem;
  box-sizing: content-box;
}

.container .card .catagories button:nth-child(1) {
  border-right: 1px inset white;
}
.container .card .catagories button:nth-child(2) {
  border-right: 1px inset white;
}

.container .card .catagories button {
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: bold;
  color: #370d26;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

.table {
  width: 100%;
  height: 85%;
  margin-bottom: 0;
}

.active {
  color: rgb(93, 240, 93) !important;
}
.active-small {
  color: rgb(241, 8, 39) !important;
}
</style>
