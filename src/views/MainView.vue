<template>
  <div class="container-main" id="home">
    <section class="title">
      <img src="@/assets/logo_white.png" alt="savine logo" />
    </section>
    <section class="main-quote">
      <div>
        <h1>Twoje paznokcie są odbiciem ciebie samej.</h1>
        <p>A naszą pasją.</p>
      </div>
      <router-link to="/panel" class="button">Zapisz się już teraz</router-link>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container-main {
  height: 100vh;
  position: relative;
  background-image: url('@/assets/1bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

/* logo */

.container-main .title {
  position: absolute;
  top: 19vh;
  left: 2vw;
}

/* QUOTE SECTION */

.container-main .main-quote {
  position: absolute;
  top: 76vh;
  right: 0vw;
}

.container-main .main-quote div {
  position: relative;
  padding: 0.1rem 50px;
}

.container-main .main-quote h1 {
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
}

.container-main .main-quote p {
  font-size: 1.5rem;
  font-weight: 400;
  font-style: italic;
  margin-top: 0.2rem;
}

.container-main .main-quote .button {
  position: absolute;
  bottom: -0.6rem;
  right: 5.5rem;
  display: inline-block;
  border: 1px solid #bcffbc;
  background: none;
  color: #bcffbc;
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 18px 40px;
  letter-spacing: 1px;
  font-weight: 700;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;
}
</style>
