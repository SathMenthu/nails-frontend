<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/logo_white.png" alt="logo Savine" />
    </div>
    <section v-if="loginForm" class="login">
      <div class="card">
        <form class="loginForm" @submit.prevent="login()">
          <div class="form-group">
            <label for="login-email"
              ><mdicon name="email" :size="'2.2rem'" />
              <input type="email" v-model="email" required placeholder="Email" />
            </label>
          </div>
          <div class="form-group">
            <mdicon name="lock" :size="'2.2rem'" />
            <label for="login-password">
              <input type="password" v-model="password" required placeholder="Hasło" />
            </label>
          </div>

          <button type="submit">Zaloguj się</button>
        </form>
        <div class="ask">
          Nie masz konta?
          <button @click="loginForm = !loginForm"><strong>Zarejestruj się</strong></button>
        </div>
      </div>
    </section>
    <section v-if="!loginForm" class="register">
      <div class="card">
        <form class="registerForm" autocomplete="off" @submit.prevent="register">
          <div class="form-group">
            <label for="register-email"
              ><mdicon name="email" :size="'2.2rem'" />
              <input type="email" v-model="email" required placeholder="Email" />
            </label>
          </div>
          <div class="form-group">
            <mdicon name="lock" :size="'2.2rem'" />
            <label for="register-password">
              <input
                type="password"
                v-model="password"
                autocomplete="new-password"
                required
                placeholder="Hasło"
              />
            </label>
          </div>
          <div class="form-group">
            <mdicon name="account-outline" :size="'2.2rem'" />
            <label for="register-name">
              <input type="text" v-model="name" required placeholder="Imię" />
            </label>
          </div>
          <div class="form-group">
            <label for="register-lastname">
              <mdicon name="account-outline" :size="'2.2rem'" />
              <input type="text" v-model="lastname" required placeholder="Nazwisko" />
            </label>
          </div>
          <div class="form-group">
            <mdicon name="phone" :size="'2.2rem'" />
            <label for="register-phoneNumber">
              <input type="tel" v-model="phoneNumber" required placeholder="Numer Telefonu" />
            </label>
          </div>

          <button type="submit">Zarejestruj Się</button>
        </form>
        <div class="ask">
          Masz już konto?
          <button @click="loginForm = !loginForm"><strong>Zaloguj się</strong></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loginForm = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');
const lastname = ref('');
const phoneNumber = ref('');

async function login() {
  const payload = {
    email: email.value,
    password: password.value,
  };
  await store.dispatch('login', payload);
}

async function register() {
  const payload = {
    email: email.value,
    password: password.value,
    name: name.value,
    lastname: lastname.value,
    phoneNumber: phoneNumber.value,
  };
  const isSuccess: boolean = await store.dispatch('register', payload);
  if (isSuccess) {
    loginForm.value = !loginForm.value;
    email.value = '';
    password.value = '';
    name.value = '';
    lastname.value = '';
    phoneNumber.value = '';
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/3bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container .logo {
  margin: 2rem auto;
}

.container .logo img {
  width: 24vw;
  height: 24vh;
  object-fit: fill;
}
.container .login .card {
  margin-bottom: 30vh;
}

.container .card form {
  display: grid;
  grid-gap: 1.5rem;
}

.container .card .form-group {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.1rem 0.8rem 0.1rem 0;
  border-radius: 2rem;
}

.container .card form input {
  width: 16vw;
  height: 3rem;
  background-color: transparent;
  color: #ddd;
  padding: 0.8rem 0 0.8rem 1rem;
  letter-spacing: 1px;
  outline: none;
  border: none;
  font-size: 1.3rem;
}

.container .card form span {
  padding-left: 1.2rem;
}

::placeholder {
  color: #ddd;
  opacity: 0.96;
}

button {
  border-radius: 1.2rem;
  border: 1px solid #fc636b;
  background-color: #fc636b;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.9rem 3rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}

.container .ask {
  margin-top: 1rem;
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 300;
  font-style: italic;
  color: #ccc;
  text-align: end;
}

.container .ask button {
  border: none;
  background-color: transparent;
  padding: 0;
}

.container .ask strong {
  text-decoration: underline;
  margin-right: 1rem;
  cursor: pointer;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active,
input:-webkit-autofill:valid,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-transition-delay: 99999s;
}

@media (max-width: 1450px) {
  .logo {
    display: none;
  }
}
</style>
