<template>
  <v-row>
    <v-col cols="7"></v-col>
    <v-col cols="5">
      <v-card elevation="2" outlined shaped class="mb-4 mt-5">
        <v-card-title class="text-center"
          >&#9679; Sekcja Pielęgnacyjna &#9679;</v-card-title
        >
        <v-divider color="white"></v-divider>
        <v-card-actions :key="index" v-for="(tariff, index) in tariffCare">
          <v-card-text>{{ tariff.name }}</v-card-text>
          <v-card-text>{{ tariff.price }} zł</v-card-text>
        </v-card-actions>
      </v-card>
      <v-card elevation="2" outlined shaped>
        <v-card-title class="text-center"
          >&#9679; Stylizacja Paznokci &#9679;</v-card-title
        >
        <v-divider color="white"></v-divider>
        <v-card-actions :key="index" v-for="(tariff, index) in tariffStyling">
          <v-card-text>{{ tariff.name }} </v-card-text
          ><v-card-text>{{ tariff.price }} zł</v-card-text>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, onBeforeMount } from 'vue';

const store = useStore();

const tariffStyling = ref([]);
const tariffCare = ref([]);

onBeforeMount(async () => {
  const doc = document.getElementById('app-bgc');
  doc.classList.add('app-background4');
  doc.classList.remove('app-background2');
  doc.classList.remove('app-background1');
  doc.classList.remove('app-background3');
  doc.classList.remove('app-background5');
  await store.dispatch('tariffList');
  const tariffBeforeSeperate = store.getters.tariffList;
  for (const t of tariffBeforeSeperate) {
    if (t.category === 'CARE') {
      tariffCare.value.push(t);
    }
    if (t.category === 'STYLING') {
      tariffStyling.value.push(t);
    }
  }
  tariffCare.value = tariffCare.value.sort((a, b) => a.priority - b.priority);
  tariffStyling.value = tariffStyling.value.sort(
    (a, b) => a.priority - b.priority,
  );
});
</script>

<style scoped>
.v-card {
  border: solid 1px rgb(255, 255, 255);
  box-shadow: 1px 1px 5px rgb(255, 255, 255);
  color: #370d26;
}

.v-card-title {
  background-color: rgb(187, 108, 121);
  text-transform: uppercase;
  font-size: 24px;
}

.v-card-actions {
  background-color: rgb(243, 165, 176);
}

.v-card-actions .v-card-text:nth-child(2) {
  text-align: end;
}
.v-card-text {
  font-size: 18px;
  text-shadow: 0.2px 0.1px black;
}
</style>
