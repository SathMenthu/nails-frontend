<template>
  <v-row id="location-row">
    <v-col>
      <div class="info">
        <h2>Lokalizacja</h2>
        <p>
          Salon znajduje się w Jelczu Laskowicach przy ulicy Targowa 1. Przy
          wejściu do targu od strony ronda imienia Ofiar Katyńskich.
        </p>
        <p></p>
      </div>
      <div id="mapContainer"></div
    ></v-col>
    <v-col></v-col>
  </v-row>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';

const StreetMap = ref();
L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
onMounted(() => {
  StreetMap.value = L.map('mapContainer').setView([51.0356385, 17.3411357], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(StreetMap.value);

  const marker = L.marker([51.0358589, 17.3410257]).addTo(StreetMap.value);
  marker
    .bindPopup(
      '<strong>Savine Nails Studio </strong><br> 55-220 Jelcz Laskowice  <br> ul. Targowa 1 <br> <strong>Tel: 668 330 396</strong>',
    )
    .openPopup();
});

onBeforeMount(() => {
  const doc = document.getElementById('app-bgc');
  doc.classList.add('app-background2');
  doc.classList.remove('app-background1');
  doc.classList.remove('app-background3');
  doc.classList.remove('app-background4');
  doc.classList.remove('app-background5');
});

onUnmounted(() => {
  StreetMap.value.remove();
});
</script>

<style scoped>
#mapContainer {
  margin: 0;
  padding: 5px;
  width: 800px;
  height: 400px;
  border: solid rgb(179, 60, 106);
  margin-left: 10px;
}

.info {
  color: white;
  margin: 50px 0px;
}

.info h2 {
  text-transform: uppercase;
  text-align: center;
  font-size: 50px;
}

.info p {
  font-size: 28px;
}
</style>
