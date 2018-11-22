<template>
  <div id="app">
    <home-component></home-component>
  </div>
</template>

<script>
import HomeComponent from './components/HomeComponent'
export default {
  name: 'app',
  components: {
    HomeComponent
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top:0;
}
</style>
