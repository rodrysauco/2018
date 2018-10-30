<template>
  <el-container>
    <el-header class="header">
      <span>TP N°007</span>
    </el-header>
    <el-main>
      <el-tabs @tab-click="handleClick" class="tabs">
        <el-tab-pane label="Home" name="/"></el-tab-pane>
        <el-tab-pane label="Agregar" name="/add"></el-tab-pane>
      </el-tabs>
      <router-view></router-view> 
    </el-main>
  </el-container>
</template>

<script>
  import router from "@/router";
  export default {
    name: 'app',
    methods:{
      handleClick(tab){
        router.push(tab.$options.propsData.name);
      }
    }
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
  .header{
    background-color: #a4ccdb;
    text-align: right;
    font-size: 50px;
  }
  
</style>