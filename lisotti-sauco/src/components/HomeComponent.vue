<template>
  <div class="home__wrapper">
    <el-row class="headerActions">
      <span class="appHeader"><img src="../media/logo.png" alt="Clash Royale Logo"></span>
      <el-menu :default-active="index" class="el-menu-demo" mode='horizontal' :router='true'>
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/arenas">Arenas</el-menu-item>
        <el-menu-item index="/cards">Cards</el-menu-item>
        <el-menu-item index="/chests">Chests</el-menu-item>
        <el-menu-item index="/leagues">Leagues</el-menu-item>
        <el-menu-item index="/players">Players</el-menu-item>
      </el-menu>
    </el-row>
    <el-container>
      <transition name='component-fade' mode="out-in">
        <router-view />
      </transition>
    </el-container>
  </div>
</template>

<script>
import loginService from "./../services/loginService.js";
import router from "../router.js";
export default {
  name: "home-component",
  computed: {
    index: function() {
      let route = this.$route.path.split("/");
      return "/" + route[1];
    }
  },
  methods: {
    checkStatus() {
      let credentials = loginService.getCredentials();
      if (credentials === null) {
        router.push({ name: "login" });
      }
    }
  },
  beforeMount() {
    this.checkStatus();
  }
};
</script>

<style>
.appHeader {
  width: 20%;
  max-width: 150px;
  padding: 10px;
  display: inline-block;
}
.appHeader img {
  width: 100%;
}
.headerActions {
  width: 100%;
}
.headerActions > ul {
  display: inline-block;
  width: 80%;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
