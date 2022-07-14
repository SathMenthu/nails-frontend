<template>
  <div class="container-visitlist">
    <div><h2>Wizyty</h2></div>
    <div class="spacer"></div>
    <table>
      <thead>
        <tr class="table-headers">
          <td>Lp.</td>
          <td>Data</td>
          <td>Potwierdzenie</td>
          <td>Zabieg</td>
          <td>Klient</td>
          <td>Komentarz</td>
          <td>Akcja</td>
        </tr>
      </thead>

      <tbody>
        <tr :key="reservation.date" v-for="(reservation, index) in reservationList">
          <td>{{ index + 1 }}.</td>
          <td>{{ new Date(reservation.date).toLocaleString('pl-PL') }}</td>
          <td>{{ reservation.confirmed ? 'Potwierdzona' : 'Niepotwierdzona' }}</td>
          <td>{{ reservation.tariff.name }}</td>
          <td>
            {{ reservation.user.name }} {{ reservation.user.lastname }} <br />
            Tel: {{ reservation.user.phoneNumber }}
          </td>
          <td>
            <p>{{ reservation.comment }}</p>
          </td>
          <td>
            <button v-if="!reservation.confirmed" @click="confirmVisit(reservation)">
              Potwierdź Wizytę
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { OrderReservationModel } from '@/types';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('getAllReservations');
const reservationList = computed(() => store.getters.adminReservationList);
function confirmVisit(reservation: OrderReservationModel) {
  const updatedReservation = ref(reservation);
  updatedReservation.value.confirmed = true;
  store.dispatch('updateReservation', updatedReservation.value);
}
</script>

<style scoped>
.container-visitlist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  padding: 0 0.5rem;
  max-width: 1rem;
  white-space: normal !important;
  word-wrap: break-word;
}

td button {
  border: 1px solid black;
  padding: 0.2rem;
  background-color: greenyellow;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
