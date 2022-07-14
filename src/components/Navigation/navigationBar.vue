<template>
  <nav>
    <router-link :to="'/'">Strona Główna </router-link>
    <router-link :to="'/tariff'">Cennik</router-link>
    <router-link :to="'/location'">Lokalizacja</router-link>
    <router-link to="/panel">Panel Klienta<span class="save">[ZAPISZ SIĘ]</span></router-link>
    <div>
      <a href="https://www.facebook.com/SavineNails" target="_blank"
        ><mdicon name="facebook" :size="'2.2rem'" />
        <p class="blank">fb</p></a
      >
      <a href="https://www.instagram.com/savine_nails_studio/" target="_blank"
        ><mdicon name="instagram" :size="'2.2rem'" />
        <p class="blank">ig</p></a
      >
    </div>
    <button v-if="isLoggedIn" @click="logout()">Wyloguj</button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);

async function logout() {
  store.dispatch('logout', true);
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 1px 1px rgb(39, 39, 39);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7vh;
  z-index: 100;
}

nav a,
button {
  text-decoration: none;
  margin-right: 1em;
  font-size: 1.5em;
  color: var(--color-white);
  padding: 2rem;
}

button {
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  border: none;
}

nav div {
  position: absolute;
  top: 1.6rem;
  right: 0.2rem;
}
nav div :first-child {
  margin: 0;
  padding: 0;
}

nav div span {
  cursor: pointer;
}
.save {
  font-size: 1.2rem;
  margin-left: 0.5rem;
  color: #bcffbc;
}
.blank {
  display: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 1600px) {
  nav div {
    display: none;
  }
}
</style>
