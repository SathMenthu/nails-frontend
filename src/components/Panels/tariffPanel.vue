<template>
  <div class="container-visitlist">
    <div><h2>CENNIK</h2></div>
    <div class="spacer"></div>
    <table>
      <thead>
        <tr class="table-headers">
          <td>Lp.</td>
          <td>Nazwa</td>
          <td>Kategoria</td>
          <td>Cena</td>
          <td>Priorytet</td>
          <td>Akcje</td>
        </tr>
      </thead>

      <tbody>
        <tr :key="tariff.priority" v-for="(tariff, index) in tariffList">
          <td>{{ index + 1 }}.</td>
          <td>{{ tariff.name }}</td>
          <td>{{ tariff.category }}</td>
          <td>{{ tariff.price }}</td>
          <td>
            {{ tariff.priority }}
          </td>

          <td>
            <button @click="editTariff(tariff)">Edytuj</button>
            <button class="delete" @click="deleteTariff(tariff)">Usuń</button>
          </td>
        </tr>
      </tbody>
    </table>
    <EditTariffModal
      :tariff="currentTariff"
      v-if="showEditTariffModal"
      @cancel="showEditTariffModal = false"
    />
    <AddTariffModal v-if="showAddTariffModal" @cancel="showAddTariffModal = false" />

    <button class="add-tariff" @click="addTariff()">Dodaj Nowa Pozycję</button>
  </div>
</template>

<script setup lang="ts">
import { Tariff, Categories } from '@/types';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import EditTariffModal from '../Modal/editTariffModal.vue';
import AddTariffModal from '../Modal/addTariffModal.vue';

const store = useStore();
store.dispatch('tariffList');
const showAddTariffModal = ref(false);
const showEditTariffModal = ref(false);
const currentTariff = ref<Tariff>({
  id: '',
  name: '',
  price: '',
  category: Categories.STYLING,
  priority: 0,
});
const tariffList = computed(() => store.getters.tariffList);
function editTariff(tariff: Tariff) {
  currentTariff.value = tariff;
  showEditTariffModal.value = true;
}
function deleteTariff(tariff: Tariff) {
  store.dispatch('deleteTariff', tariff);
}
function addTariff() {
  showAddTariffModal.value = true;
}
</script>

<style scoped>
.container-visitlist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.container-visitlist div:nth-child(1) {
  text-align: center;
  text-transform: uppercase;
  font-size: 1.4rem;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  margin: 1rem;
}

th,
td {
  border: 1px solid black;
  text-align: center;
}

tr td:nth-child(1) {
  max-width: 1px;
}

td {
  padding: 0 1rem;
  max-width: 1rem;
  white-space: normal !important;
  word-wrap: break-word;
}

td button {
  border: 1px solid black;
  color: white;
  padding: 6px;
  margin: 0.2rem;
  background-color: rgb(10, 155, 65);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
}

.editItemModal {
  position: absolute;
  top: 10%;
  left: 17%;
  height: 50vh;
  width: 40vw;
  border: black solid 2px;
  box-shadow: 2px 1px black;
}

.delete {
  background-color: rgb(252, 69, 69);
  color: white;
  padding: 6px;
}

.add-tariff {
  margin-top: 2rem;
  margin-left: 2rem;
  width: 200px;
  height: 50px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: rgb(49, 31, 214);
  color: white;
}
</style>
