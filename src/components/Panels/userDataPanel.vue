<template>
  <v-card class="mt-15" elevation="11" shaped>
    <v-card-title><p>Twoje Dane</p></v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-form ref="userDataForm" v-if="userData">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                prepend-inner-icon="mdi-email"
                v-model="userData.email"
                type="email"
                label="Email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                prepend-inner-icon="mdi-account-outline"
                v-model="userData.name"
                label="Imię"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                prepend-inner-icon="mdi-account-outline"
                v-model="userData.lastname"
                label="Nazwisko"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                prepend-inner-icon="mdi-phone"
                v-model="userData.phoneNumber"
                label="Numer Telefonu"
                maxlength="9"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" justify="center" align="center">
              <v-btn @click.prevent="updateData()">Zaktualizuj Dane</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['userData']),
  },
  methods: {
    ...mapActions(['updateUser']),
    async updateData() {
      await this.updateUser(this.userData);
    },
  },
};
</script>

<style scoped>
.v-form {
  width: 100%;
}
.v-card {
  width: 600px;
  height: 600px;
  background-color: rgb(63, 16, 24);
  color: rgb(255, 255, 255);
  font-weight: 600;
}

.card-row {
  justify-content: center;
  text-align: center;
}

.v-card-title p {
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
