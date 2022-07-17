<template>
  <v-dialog v-if="show" v-model="show" max-width="700px" persistent>
    <v-card>
      <v-card-title>Edycja Pozycji w Cenniku</v-card-title>
      <v-card-actions>
        <v-form
          v-model="valid"
          lazy-validation
          ref="tariffForm"
          class="tariff-form"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-pencil-box-outline"
                  v-model="currentTariff.name"
                  type="text"
                  label="Nazwa"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  prepend-inner-icon="mdi-pencil-box-multiple-outline"
                  :items="tariffStyles"
                  label="Rodzaj Usługi"
                  v-model="currentTariff.category"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="number"
                  prepend-inner-icon="mdi-shield-edit-outline"
                  v-model="currentTariff.priority"
                  label="Priorytet"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-actions>
      <v-card-actions class="pb-2 pb-5">
        <v-row>
          <v-col align="center" justify="center">
            <v-btn width="50%" class="success" @click="updateData()"
              >Zapisz Zmiany</v-btn
            ></v-col
          >
          <v-col align="center" justify="center">
            <v-btn width="50%" class="error" @click.stop="show = false"
              >Anuluj</v-btn
            ></v-col
          >
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, defineProps, computed, defineEmits } from 'vue';

const store = useStore();
const props = defineProps(['visible', 'tariff']);
const emit = defineEmits(['closeDialog']);

const valid = ref();
const tariffStyles = ref(['STYLING', 'CARE']);

const currentTariff = ref({
  id: props.tariff.id,
  name: props.tariff.name,
  price: props.tariff.price,
  category: props.tariff.category,
  priority: props.tariff.priority,
});

const show = computed({
  get() {
    return props.visible;
  },
  set(newValue) {
    if (!newValue) {
      emit('closeDialog');
    }
  },
});

function updateData() {
  store.dispatch('updateTariff', currentTariff.value);
}
</script>

<style scoped>
.v-card {
  background-color: rgb(63, 16, 24);
  color: rgb(255, 255, 255);
  font-weight: 600;
  width: 700px;
}

.card-row form .v-col {
  margin-top: 10px;
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

.v-form {
  width: 100%;
}
</style>
