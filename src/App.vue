<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div id="app-container">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box; /* Esto arregla el bug visual en pantallas muy pequeñas en el que el contenido no se adapta de manera correcta horizontalmente */
}
/* Mejora: menos padding en moviles para ganar espacio */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}

</style>
