<template>
  <div class="userdata-container">
    <form @submit.prevent="updateData()">
      <div class="label-container">
        <span>Email: </span>
        <label for="email"> <input type="email" v-model="user.email" placeholder="Email" /> </label>
      </div>
      <div class="label-container">
        <span>Imię: </span>
        <label for="name"> <input type="text" v-model="user.name" placeholder="Imię" /> </label>
      </div>
      <div class="label-container">
        <span>Nazwisko: </span>
        <label for="lastname">
          <input type="text" v-model="user.lastname" placeholder="Nazwisko" />
        </label>
      </div>
      <div class="label-container">
        <span>Numer Telefonu: </span>
        <label for="phoneNumber">
          <input type="tel" v-model="user.phoneNumber" maxlength="9" placeholder="Numer Telefonu" />
        </label>
      </div>
      <button type="submit">Zaktualizuj Dane</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const userData = defineProps(['userData']);
const user = ref(userData.userData);

async function updateData() {
  await store.dispatch('updateUser', user.value);
}
</script>

<style scoped>
.userdata-container {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

form:nth-child(1) {
  text-align: center;
}

.userdata-container .label-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.userdata-container .label-container {
  font-size: 2rem;
  padding: 1rem;
}

.userdata-container .label-container input {
  width: 16vw;
  height: 3rem;
  color: #370d26;
  padding: 0.8rem 3rem 0.8rem 1rem;
  letter-spacing: 1px;
  outline: none;
  border: none;
  font-size: 1.3rem;
  border: solid 1px #fd0a0a;
}

button {
  margin-top: 10vh;
  padding: 1rem 8rem;
  border-radius: 1.2rem;
  border: 1px solid black;
  background-color: #0bce63;
  color: #370d26;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
