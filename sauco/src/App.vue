<template>
  <div id="app">
    <h1>Holis</h1>
    <section class="nav">
      <router-link to='/'>Home</router-link> | 
      <router-link to="/add">Agregar </router-link>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    //nada que observar por aqui    
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>