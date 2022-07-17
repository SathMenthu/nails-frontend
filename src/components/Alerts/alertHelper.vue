<template>
  <div class="movesnackbar">
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Zamknij </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    snackbar: false,
    text: '',
    color: '',
    timeout: 2500,
  }),
  computed: {
    ...mapGetters(['triggerSnackBar', 'alertMessage', 'alertColor']),
  },
  watch: {
    triggerSnackBar(value) {
      if (value) {
        (this.snackbar = true),
          (this.text = this.alertMessage),
          (this.color = this.alertColor);
      } else {
        (this.snackbar = false), (this.text = ''), (this.color = '');
      }
    },
  },
};
</script>

<style>
.v-snackbar__content {
  color: white;
}
</style>
