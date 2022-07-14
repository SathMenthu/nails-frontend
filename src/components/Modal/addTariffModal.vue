<template>
  <div class="editItemModal">
    <form @submit.prevent="addTariff()">
      <div class="label-container">
        <span>Nazwa: </span>
        <label for="name">
          <input type="name" v-model="currentTariff.name" placeholder="Nazwa" />
        </label>
      </div>
      <div class="label-container">
        <span>Kategoria </span>
        <label for="categories">
          <select v-model="currentTariff.category">
            <option value="STYLING">Stylizacja</option>
            <option value="CARE">Pielęgnacja</option>
          </select>
        </label>
      </div>
      <div class="label-container">
        <span>Cena: </span>
        <label for="price">
          <input type="number" v-model="currentTariff.price" placeholder="Cena" />
        </label>
      </div>
      <div class="label-container">
        <span>Priorytet: </span>
        <label for="priority">
          <input type="number" v-model="currentTariff.priority" placeholder="Priorytet" />
        </label>
      </div>
      <div class="button-box">
        <button type="submit">Dodaj</button
        ><button @click="$emit('cancel')" class="cancel">Anuluj</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Tariff, Categories } from '@/types';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currentTariff = ref<Tariff>({
  id: '',
  name: '',
  price: '',
  category: Categories.STYLING,
  priority: 0,
});

function addTariff() {
  store.dispatch('addTariff', currentTariff.value);
}
</script>

<style scoped>
.editItemModal {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  background-color: rgba(55, 172, 226);
}

form:nth-child(1) {
  text-align: center;
}

.editItemModal .label-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editItemModal .label-container {
  font-size: 2rem;
  padding: 1rem;
}

.editItemModal .label-container input {
  height: 3rem;
  color: #370d26;
  padding: 0.8rem 3rem 0.8rem 1rem;
  letter-spacing: 1px;
  outline: none;
  border: none;
  font-size: 1.3rem;
  border: solid 1px #131212;
}

button {
  margin-top: 10vh;
  padding: 1rem 8rem;
  border-radius: 1.2rem;
  border: 1px solid black;
  background-color: rgb(10, 155, 65);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}

label :nth-child(1) {
  box-sizing: border-box;
  width: 18.5vw;
  height: 5vh;
}

.button-box {
  display: flex;
  justify-content: space-between;
  margin: 0 4rem;
}

.cancel {
  background-color: rgb(252, 69, 69);
  color: white;
}

select {
  font-size: 1.5rem;
}
</style>
