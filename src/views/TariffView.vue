<template>
  <section class="container">
    <div class="container-tariff">
      <div class="styling">
        <div class="header">
          <h2>&#9679; Sekcja Pielęgnacyjna &#9679;</h2>
        </div>
        <div class="spacer"></div>
        <div class="tariff" :key="tariff.id" v-for="tariff in tariffCare">
          <div class="name">
            <p>{{ tariff.name }}</p>
          </div>
          <div class="price">
            <p>{{ tariff.price }} zł</p>
          </div>
        </div>
      </div>
      <div class="care">
        <div class="header">
          <h2>&#9679; Stylizacja Paznokci &#9679;</h2>
        </div>
        <div class="spacer"></div>
        <div class="tariff" :key="tariff.id" v-for="tariff in tariffStyling">
          <div class="name">
            <p>{{ tariff.name }}</p>
          </div>
          <div class="price">
            <p>{{ tariff.price }} zł</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { Tariff } from '@/types/management/tariff';
import { ref, onBeforeMount } from 'vue';

const store = useStore();

const tariffStyling = ref<Tariff[]>([]);
const tariffCare = ref<Tariff[]>([]);

onBeforeMount(async () => {
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
});
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: flex-end;
  background-image: url('@/assets/4bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.container .container-tariff {
  width: 70vh;
  height: 75vh;
  display: flex;
  flex-direction: column;
  margin-right: 5vw;
}

.styling,
.care {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.4rem;
  height: 100%;
  border: solid 1px rgb(255, 255, 255);
  box-shadow: 1px 1px 5px rgb(255, 255, 255);
  background-color: rgb(228, 163, 173);
  color: #370d26;
}

.container .care {
  margin-top: 2rem;
}

.container .tariff {
  display: flex;
  justify-content: space-between;
}

.container .tariff div {
  font-size: 1.6rem;
  padding: 0 1rem;
}

.container .tariff .name {
  margin-right: 3rem;
}
.container .tariff p {
  padding: 0;
  margin: 0;
  display: inline;
}
</style>
