<template>
  <v-card class="mt-15" elevation="11" shaped>
    <v-card-title><p>Lista Wizyt</p></v-card-title>
    <v-divider></v-divider>

    <v-card-actions>
      <v-table>
        <thead>
          <tr class="table-headers">
            <th>Lp.</th>
            <th>Data</th>
            <th>Potwierdzenie</th>
            <th>Zabieg</th>
            <th>Komentarz</th>
          </tr>
        </thead>

        <tbody>
          <tr
            :key="reservation.date"
            v-for="(reservation, index) in reservationList"
          >
            <td>{{ index + 1 }}.</td>
            <td>
              {{ new Date(reservation.date).toLocaleString('pl-PL') }}
            </td>
            <td>
              {{ reservation.confirmed ? 'Potwierdzona' : 'Niepotwierdzona' }}
            </td>
            <td>
              {{ reservation.tariff.name }} - [{{ reservation.tariff.price }}
              zł]
            </td>
            <td>
              <p>{{ reservation.comment }}</p>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('getReservationForCurrentUser');
const reservationList = computed(() => store.getters.userReservationList);
</script>

<style scoped>
.v-card {
  width: 600px;
  height: 600px;
  background-color: rgb(63, 16, 24);
  color: rgb(255, 255, 255);
  font-weight: 600;
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
</style>
