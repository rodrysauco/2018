<template>
  <div class="home__wrapper">
    <el-container>
      <el-header class="appHeader">
        <img src="../media/logo.png" alt="Clash Royale Logo">
      </el-header>
      <el-row class="headerActions">
        <el-menu :default-active="index" class="el-menu-demo" mode='horizontal' :router='true'>
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/arenas">Arenas</el-menu-item>
          <el-menu-item index="/cards">Cards</el-menu-item>
          <el-menu-item index="/chests">Chests</el-menu-item>
          <el-menu-item index="/leagues">Leagues</el-menu-item>
          <el-menu-item index="/players">Players</el-menu-item>
        </el-menu>
      </el-row>
      <transition name='component-fade' mode="out-in">
        <router-view />
      </transition>
    </el-container>
  </div>
</template>

<script>
import loginService from './../services/loginService.js';
import router from '../router.js';
export default {
  name:"home-component",
  computed: {
    index: function () {
      let route = this.$route.path.split("/");
      console.log(route);
      return "/"+route[1];
    }
  },
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
.appHeader{
  width: 200px;
  display: inline;
}
.appHeader img{
  width: 100%;
}
.headerActions{
  display: inline;
  
}
</style>
