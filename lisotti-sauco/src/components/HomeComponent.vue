<template>
  <p>Home</p>
</template>

<script>
import loginService from './../services/loginService.js';
import router from '../router.js';
export default {
  name:"home-component",
  methods:{
    checkStatus(){
      let credentials = loginService.getCredentials();
      if(credentials === null){ 
        router.push({name:"login"});
      };      
    }
  },
  beforeMount(){
    this.checkStatus();
  }
}
</script>

<style>
</style>
