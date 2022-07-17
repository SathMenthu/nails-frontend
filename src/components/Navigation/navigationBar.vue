<template>
  <v-app-bar app color="rgba(0, 0, 0, 0.3)">
    <v-spacer></v-spacer>
    <v-list-item
      class="d-flex align-center"
      active-class="active-element"
      link
      v-for="(panel, index) in panels"
      :key="index"
      :to="panel.to"
    >
      <v-list-item-title class="text-link">{{ panel.text }}</v-list-item-title>
    </v-list-item>
    <div v-if="permissions.length > 0">
      <v-list-item
        v-if="permissions.filter((permission) => permission === 'ADMIN').length"
        class="d-flex align-center"
        active-class="active-element"
        link
        :to="'/admin'"
      >
        <v-list-item-title class="text-link">Panel Admina</v-list-item-title>
      </v-list-item>
    </div>

    <v-list-item
      @click="logout()"
      v-if="isLoggedIn"
      active-class="active-element"
    >
      <v-list-item-title class="text-link">Wyloguj</v-list-item-title>
    </v-list-item>

    <v-spacer></v-spacer>

    <v-list-item
      href="https://www.facebook.com/SavineNails"
      target="_blank"
      active-class="active-element"
    >
      <v-list-item-title>
        <v-icon color="white">mdi-facebook</v-icon>
      </v-list-item-title>
    </v-list-item>

    <v-list-item
      href="https://www.instagram.com/savine_nails_studio/"
      target="_blank"
      active-class="active-element"
    >
      <v-list-item-title>
        <v-icon color="white">mdi-instagram</v-icon>
      </v-list-item-title>
    </v-list-item>
  </v-app-bar>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const permissions = ref([]);
const isLoggedIn = computed(() => store.getters.isLoggedIn);
if (isLoggedIn.value) {
  permissions.value = store.getters.userData.permissions;
}

const panels = ref([
  {
    name: 'mainPage',
    text: 'Strona Główna',
    to: '/',
  },
  {
    name: 'tariffPage',
    text: 'Cennik',
    to: '/tariff',
  },
  {
    name: 'locationPage',
    to: '/location',
    text: 'Lokalizacja',
  },
  {
    name: 'panelPage',
    to: '/panel',
    text: 'Panel Klienta',
  },
]);

async function logout() {
  await store.dispatch('logout', true);
}

watch(isLoggedIn, async () => {
  await store.dispatch('auth');
  if (store.getters.userData) {
    permissions.value = store.getters.userData.permissions;
  } else {
    permissions.value = [];
  }
});
</script>

<style>
.v-list-item {
  margin: 0px 10px !important;
}

.text-link {
  color: white;
  text-transform: uppercase;
  font-size: 19px;
}

.active-element {
  background-color: rgb(245, 245, 245, 0.3);
}

.v-list-item:hover {
  background-color: rgb(245, 245, 245, 0.2);
}
</style>
