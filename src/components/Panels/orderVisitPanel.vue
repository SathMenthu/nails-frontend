<template>
  <v-card class="mt-15" elevation="11" shaped>
    <v-card-title><p>Rejestracja Wizyty</p></v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-form>
        <v-row>
          <v-col>
            <div class="order-data">
              <p>Wybierz Datę:</p>
              <DatePicker
                class="datapicker"
                v-model="date"
                disableMonthYearSelect
                hoursIncrement="2"
                minutesIncrement="60"
                :disabledWeekDays="[6, 0]"
                :startTime="startTime"
              ></DatePicker>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="order-tariff">
              <p>Wybierz rodzaj usługi:</p>
              <select v-model="tariff">
                <option :key="t.priority" v-for="t in tariffList">
                  {{ t.name }} [{{ t.price }} zł]
                </option>
              </select>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              filled
              color="white"
              auto-grow
              background-color="black"
              v-model="comment"
              label="Komentarz"
              placeholder="Wpisz opcjonalny komentarz..."
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" justify="center" align="center">
            <v-btn @click="addReservation">Zarejestruj Wizytę</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const date = ref();
    const startTime = ref({ hours: 0, minutes: 0 });
    const store = useStore();
    const tariff = ref();
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
      startTime,
      date,
      tariffList,
      tariff,
      comment,
      addReservation,
    };
  },
};
</script>

<style scoped>
.v-card {
  width: 600px;
  height: 600px;
  background-color: rgb(63, 16, 24);
  color: rgb(255, 255, 255);
  font-weight: 600;
}

.v-form {
  width: 100%;
}

p {
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

.v-card-title p {
  margin-bottom: 0;
}

select {
  background-color: white;
  box-shadow: -1px -1px 5px rgb(0, 11, 14), 1px -1px 5px rgba(0, 11, 14, 1),
    -1px 1px 5px rgba(0, 11, 14, 1), 1px 1px 5px rgba(0, 11, 14, 1);
  padding: 5px;
  width: 100%;
}

.v-btn {
  padding: 10px;
  background-color: rgb(139, 61, 74);
  text-shadow: -1px -1px 3px rgb(0, 11, 14), 1px -1px 3px rgba(0, 11, 14, 1),
    -1px 1px 5px rgba(0, 11, 14, 1), 1px 1px 5px rgba(0, 11, 14, 1);
  box-shadow: -1px -1px 3px rgb(0, 11, 14), 1px -1px 3px rgba(0, 11, 14, 1),
    -1px 1px 3px rgba(0, 11, 14, 1), 1px 1px 3px rgba(0, 11, 14, 1);
}

.v-btn:hover {
  background-color: rgba(139, 61, 74, 0.322);
}
</style>
