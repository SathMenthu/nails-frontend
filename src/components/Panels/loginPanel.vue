<template>
  <v-form v-model="valid" lazy-validation ref="loginForm">
    <v-container>
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
          <button id="login-button" @click.prevent="validate()">Zaloguj</button>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <div class="ask">
    Nie masz konta?
    <button @click="emit('toggleLogReg')">
      <strong>Zarejestruj się</strong>
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['toggleLogReg']);
const store = useStore();
const loginForm = ref(null);
const valid = ref(true);
const email = ref('');
const password = ref('');
const emailRules = [
  (v) => !!v || 'E-mail musi być poprawny',
  (v) => /.+@.+\..+/.test(v) || 'E-mail musi być poprawny',
];
const passwordRules = [(v) => !!v || 'Hasło nie może być puste!'];

async function validate() {
  const { valid } = await loginForm.value.validate();
  if (valid) login();
}

async function login() {
  const payload = {
    email: email.value,
    password: password.value,
  };
  await store.dispatch('login', payload);
}
</script>

<style>
#login-button {
  border-radius: 25px;
  width: 100%;
  border: 1px solid #fc636b;
  background-color: #fc636b;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
}

#login-button:hover {
  background-color: #f84c54;
}

.v-field {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.ask {
  margin-right: 40px;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 300;
  font-style: italic;
  color: #ccc;
  text-align: end;
}

.ask button {
  border: none;
  background-color: transparent;
  padding: 0;
}

.ask strong {
  text-decoration: underline;
  margin-right: 1rem;
  cursor: pointer;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus textarea:-webkit-autofill,
textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-background-clip: text;
  font-weight: 700;
  -webkit-text-fill-color: rgb(10, 10, 10);
}
</style>
