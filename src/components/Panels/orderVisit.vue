<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="container-order-visit">
    <div><h2>Rejestracja Wizyty</h2></div>
    <div class="spacer"></div>
    <div class="order-data">
      <p>Wybierz datę:</p>
      <Datepicker
        class="datapicker"
        v-model="date"
        disableMonthYearSelect
        hoursIncrement="2"
        minutesIncrement="60"
        :disabledWeekDays="[6, 0]"
        :startTime="startTime"
      ></Datepicker>
    </div>
    <div class="order-tariff">
      <p>Wybierz rodzaj usługi:</p>
      <select v-model="tariff">
        <option :key="t.priority" v-for="t in tariffList">{{ t.name }} [{{ t.price }} zł]</option>
      </select>
    </div>

    <div class="order-comment">
      <p>(Opcjonalne) Komentarz</p>
      <textarea placeholder="Wpisz opcjonalny komentarz..." v-model="comment"></textarea>
    </div>
    <button @click="addReservation()">Zarejestruj Wizytę</button>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const date = ref();
    const startTime = ref({ hours: 0, minutes: 0 });
    const store = useStore();
    const tariff = ref<string | null>();
    const comment = ref();
    store.dispatch('tariffList');
    const tariffList = computed(() => store.getters.tariffList);

    const addReservation = async () => {
      if (tariff.value && date.value) {
        const payload = {
          date: date.value,
          comment: comment.value,
          tariffName: tariff.value.split('[')[0].trim(),
        };
        const isSuccess = await store.dispatch('addOrderReservation', payload);
        if (isSuccess) {
          date.value = null;
          tariff.value = null;
          comment.value = null;
        }
      }
    };

    return {
      date,
      startTime,
      tariffList,
      tariff,
      comment,
      addReservation,
    };
  },
};
</script>

<style scoped>
.container-order-visit {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.container-order-visit div:nth-child(1) {
  text-align: center;
  text-transform: uppercase;
  font-size: 1.4rem;
}

.container-order-visit p {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.5rem;
}

.container-order-visit .order-data,
.order-tariff,
.order-comment {
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.datapicker,
select {
  width: 40%;
  height: 50%;
}

textarea {
  resize: none;
  width: 40%;
  height: 100%;
  margin-top: 3rem;
}

.container-order-visit button {
  bottom: 15vh;
  left: 40%;
  padding: 1rem 4rem;
  position: absolute;
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
