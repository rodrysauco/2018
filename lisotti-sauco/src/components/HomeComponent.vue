<template>
  <p>Home</p>
</template>

<script>
import loginService from './../services/loginService.js';
export default {
  name:"home-component",
  beforeMount(){
    loginService.login("rick","ardo");
  }
}
</script>

<style>
</style>
