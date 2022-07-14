<template>
  <div class="location-container">
    <div class="test">
      <div class="info">
        <h2>Lokalizacja</h2>
        <p>Salon znajduje się w Jelczu Laskowicach przy ulicy Targowa 1.</p>
        <p>Przy wejściu do targu, od strony ronda imienia Ofiar Katyńskich.</p>
      </div>
      <div class="map-border">
        <div id="mapContainer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ref, onMounted, onUnmounted } from 'vue';

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
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(StreetMap.value);

  const marker = L.marker([51.0358589, 17.3410257]).addTo(StreetMap.value);
  marker
    .bindPopup(
      '<strong>Savine Nails Studio </strong><br> 55-220 Jelcz Laskowice  <br> ul. Targowa 1 <br> <strong>Tel: 668 330 396</strong>'
    )
    .openPopup();
});

onUnmounted(() => {
  StreetMap.value.remove();
});
</script>

<style scoped>
.location-container {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/2bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.test {
  position: absolute;
  top: 8vh;
  left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.map-border {
  border: 5px dashed rgb(179, 60, 106);
}

#mapContainer {
  width: 36vw;
  height: 36vh;
}

.info :nth-child(1) {
  text-align: center;
  letter-spacing: 2px;
}

.info h2 {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 3rem;
}

.info p {
  font-size: 2rem;
}

.info :nth-child(3) {
  margin-bottom: 5rem;
}
</style>
