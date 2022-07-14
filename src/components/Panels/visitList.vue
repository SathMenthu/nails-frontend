<template>
  <div class="container-visitlist">
    <div><h2>Twoje Wizyty</h2></div>
    <div class="spacer"></div>
    <table>
      <thead>
        <tr class="table-headers">
          <td>Lp.</td>
          <td>Data</td>
          <td>Potwierdzenie</td>
          <td>Zabieg</td>
          <td>Komentarz</td>
        </tr>
      </thead>

      <tbody>
        <tr :key="reservation.date" v-for="(reservation, index) in reservationList">
          <td>{{ index + 1 }}.</td>
          <td>{{ new Date(reservation.date).toLocaleString('pl-PL') }}</td>
          <td>{{ reservation.confirmed ? 'Potwierdzona' : 'Niepotwierdzona' }}</td>
          <td>{{ reservation.tariff.name }} - [{{ reservation.tariff.price }} zł]</td>
          <td>
            <p>{{ reservation.comment }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('getReservationForCurrentUser');
const reservationList = computed(() => store.getters.userReservationList);
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
</style>
