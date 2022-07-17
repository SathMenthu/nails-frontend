<template>
  <v-card class="mt-15 scroll" elevation="11" shaped>
    <v-card-title><p>Cennik</p></v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-table>
        <thead>
          <tr class="table-headers">
            <th>Lp.</th>
            <th>Nazwa</th>
            <th>Kategoria</th>
            <th>Cena</th>
            <th>Priorytet</th>
            <th>Akcje</th>
          </tr>
        </thead>

        <tbody>
          <tr :key="tariff.priority" v-for="(tariff, index) in tariffList">
            <td>{{ index + 1 }}.</td>
            <td>{{ tariff.name }}</td>
            <td>{{ tariff.category }}</td>
            <td>{{ tariff.price }} zł</td>
            <td>
              {{ tariff.priority }}
            </td>

            <td>
              <button @click="editTariff(tariff)" class="edit-button">
                Edytuj
              </button>
              <button class="delete-button" @click="deleteTariff(tariff)">
                Usuń
              </button>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-actions>
  </v-card>
  <v-card id="card-button">
    <v-row
      ><v-col align="center" justify="center">
        <v-btn @click="addTariff()"> Dodaj Nowa Pozycję</v-btn></v-col
      ></v-row
    ></v-card
  >
  <AddTariffModal
    v-if="showAddTariffModal"
    :visible="showAddTariffModal"
    @closeDialog="
      () => {
        showAddTariffModal = false;
      }
    "
  />
  <EditTariffModal
    v-if="showEditTariffModal"
    :visible="showEditTariffModal"
    :tariff="currentTariff"
    @closeDialog="
      () => {
        showEditTariffModal = false;
      }
    "
  />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import EditTariffModal from '../Modal/editTariffModal.vue';
import AddTariffModal from '../Modal/addTariffModal.vue';

const store = useStore();
store.dispatch('tariffList');
const showAddTariffModal = ref(false);
const showEditTariffModal = ref(false);
const currentTariff = ref({
  id: '',
  name: '',
  price: '',
  category: 'STYLING',
  priority: 0,
});
const tariffList = computed(() => store.getters.tariffList);
function editTariff(tariff) {
  currentTariff.value = tariff;
  showEditTariffModal.value = true;
}
function deleteTariff(tariff) {
  store.dispatch('deleteTariff', tariff);
}
function addTariff() {
  showAddTariffModal.value = true;
}
</script>

<style scoped>
.v-card {
  width: 600px;
  height: 600px;
  background-color: rgb(63, 16, 24);
  color: rgb(255, 255, 255);
  font-weight: 600;
  overflow-y: scroll;
}

#card-button {
  width: 600px;
  height: 70px;
  overflow-y: hidden;
}

.v-card-title p {
  margin-bottom: 10px;
  text-transform: uppercase;
  text-shadow: -1px -1px 5px rgb(0, 11, 14), 1px -1px 5px rgba(0, 11, 14, 1),
    -1px 1px 5px rgba(0, 11, 14, 1), 1px 1px 5px rgba(0, 11, 14, 1);
}

.v-card-title {
  height: 50px;
  text-transform: uppercase;
  background-color: rgb(139, 61, 74);
  box-shadow: -1px -1px 5px rgb(0, 11, 14), 1px -1px 5px rgba(0, 11, 14, 1),
    -1px 1px 5px rgba(0, 11, 14, 1), 1px 1px 5px rgba(0, 11, 14, 1);
}

.v-table {
  background-color: rgb(243, 144, 168);
  box-shadow: -1px -1px 5px rgb(0, 11, 14), 1px -1px 5px rgba(0, 11, 14, 1),
    -1px 1px 5px rgba(0, 11, 14, 1), 1px 1px 5px rgba(0, 11, 14, 1);
}

th {
  text-transform: uppercase !important;
  text-align: center;
}

td {
  padding: 5px !important;
}

.v-btn {
  margin-top: 10px;
  padding: 10px;
  background-color: rgb(139, 61, 74);
  text-shadow: -1px -1px 3px rgb(0, 11, 14), 1px -1px 3px rgba(0, 11, 14, 1),
    -1px 1px 5px rgba(0, 11, 14, 1), 1px 1px 5px rgba(0, 11, 14, 1);
  box-shadow: -1px -1px 3px rgb(0, 11, 14), 1px -1px 3px rgba(0, 11, 14, 1),
    -1px 1px 3px rgba(0, 11, 14, 1), 1px 1px 3px rgba(0, 11, 14, 1);
}

.edit-button,
.delete-button {
  border: 1px solid black;
  margin-top: 2px;
  padding: 2px;
  text-transform: uppercase;
  color: white;
}

.edit-button {
  background-color: rgb(71, 71, 204);
}

.delete-button {
  background-color: rgb(221, 21, 21);
}
</style>
