<template>
  <v-row>
    <v-col> <v-img src="@/assets/logo_white.png" class="logo"></v-img></v-col>
    <v-spacer></v-spacer>
    <v-col align-self="end">
      <div class="slogan">
        <p>Twoje paznokcie są odbiciem ciebie samej.</p>
        <p>
          A naszą pasją.
          <button @click="$router.push('/panel')" id="save-me-button">
            Zapisz się już teraz
          </button>
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  const doc = document.getElementById('app-bgc');
  doc.classList.add('app-background1');
  doc.classList.remove('app-background2');
  doc.classList.remove('app-background3');
  doc.classList.remove('app-background4');
  doc.classList.remove('app-background5');
});
</script>

<style scoped>
.v-row {
  height: 100%;
}
.logo {
  width: 700px;
  margin-top: 80px;
}

.slogan {
  margin-bottom: 30px;
  float: right;
  color: white;
}

.slogan :nth-child(1) {
  white-space: nowrap;
  font-size: 30px;
  font-weight: 100;
  text-shadow: 3px 1px black;
  text-transform: uppercase;
}

.slogan :nth-child(2) {
  display: block;
  font-size: 20px;
  font-weight: 400;
  font-style: italic !important;
  text-shadow: 3px 1px black;
  text-transform: none;
  width: auto;
}

#save-me-button {
  float: right;
  padding: 10px;
  border: 1px solid #bcffbc;
  text-shadow: 3px 1px black;
  background: none;
  color: #bcffbc;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
}

#save-me-button:hover {
  background: #bcffbc17;
}
</style>
