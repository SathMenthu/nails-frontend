<template>
  <v-form
    v-model="valid"
    lazy-validation
    ref="registerForm"
    class="register-form"
  >
    <v-container>
      <row>
        <v-col><h1>Rejestracja</h1></v-col>
      </row>
      <v-row>
        <v-col>
          <v-text-field
            prepend-inner-icon="mdi-email"
            v-model="email"
            :rules="emailRules"
            type="email"
            label="Email"
            required
            autocomplete="off"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            type="password"
            prepend-inner-icon="mdi-lock"
            v-model="password"
            :rules="passwordRules"
            label="Hasło"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            type="text"
            prepend-inner-icon="mdi-account-outline"
            v-model="name"
            :rules="nameRules"
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
            v-model="lastname"
            :rules="lastnameRules"
            label="Nazwisko"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            type="tel"
            prepend-inner-icon="mdi-phone"
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            label="Numer Telefonu"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <button id="login-button" @click.prevent="validate()">
            Rejestracja
          </button>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <div class="ask">
    Masz już konto?
    <button @click="emit('toggleLogReg')">
      <strong>Zaloguj się</strong>
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['toggleLogReg']);

const store = useStore();
const registerForm = ref(null);
const valid = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');
const lastname = ref('');
const phoneNumber = ref('');
const emailRules = [
  (v) => !!v || 'E-mail musi być poprawny',
  (v) => /.+@.+\..+/.test(v) || 'E-mail musi być poprawny',
];
const passwordRules = [(v) => !!v || 'Hasło nie może być puste!'];
const nameRules = [(v) => v.length >= 4 || 'Imię musi mieć minimum 4 znaki'];
const lastnameRules = [
  (v) => v.length >= 4 || 'Nazwisko musi mieć minimum 4 znaki',
];
const phoneNumberRules = [
  (v) => v.length === 9 || 'Numer telefonu musi mieć 9 liczb',
  (v) =>
    /^\+?[0-9]{3}-?[0-9]{6,12}$/.test(v) || 'Numer telefonu musi być poprawny!',
];

async function validate() {
  const { valid } = await registerForm.value.validate();

  if (valid) register();
}

async function register() {
  const payload = {
    email: email.value,
    password: password.value,
    name: name.value,
    lastname: lastname.value,
    phoneNumber: Number(phoneNumber.value),
  };
  const isSuccess = await store.dispatch('register', payload);
  if (isSuccess) {
    registerForm.value.reset();
  }
}
</script>

<style>
h1 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  font-weight: 500;
  letter-spacing: 3px;
  margin: 10px 0;
}
</style>
