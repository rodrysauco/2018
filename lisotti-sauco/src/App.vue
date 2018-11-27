<template>
  <div id="app">
    <index-component></index-component>
  </div>
</template>

<script>
import IndexComponent from './components/IndexComponent'
export default {
  name: 'app',
  components: {
    IndexComponent
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
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
