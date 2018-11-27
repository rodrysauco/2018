<template>
  <div class="home__wrapper">
    <el-row class="headerActions">
      <span class="appHeader">
        <img src="../media/clash_logo.png" alt="Clash Royale Logo">
      </span>
      <el-menu :default-active="index" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/home">Home</el-menu-item>
        <el-menu-item index="/arenas">Arenas</el-menu-item>
        <el-menu-item index="/cards">Cards</el-menu-item>
        <el-menu-item index="/chests">Chests</el-menu-item>
        <el-menu-item index="/leagues">Leagues</el-menu-item>
        <el-menu-item index="/players">Players</el-menu-item>
      </el-menu>
      <el-button @click="logout" class="logoutButton" type="primary" size="mini">Logout</el-button>
    </el-row>
    <el-container>
      <transition name="component-fade" mode="out-in">
        <router-view/>
      </transition>
    </el-container>
  </div>
</template>

<script>
import loginService from "./../services/loginService.js";
import router from "../router.js";
export default {
  name: "index-component",
  computed: {
    index: function () {
      let route = this.$route.path.split("/");
      return "/" + route[1];
    }
  },
  methods: {
    logout() {
      loginService.logout();
      router.push({ name: "login" });
    }
  },
};
</script>

<style>
.appHeader {
  width: 20%;
  max-width: 180px;
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
  width: 85%;
  margin-top: 16px;
  margin-bottom: 16px;
}
.logoutButton{
  position: absolute;
  top: 30px;
  right: 2.25%;
}
@media only screen and (max-width : 800px){
  .headerActions > ul {
    width: 75%;
  }
}
</style>
