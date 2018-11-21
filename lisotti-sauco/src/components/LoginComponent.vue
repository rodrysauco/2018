<template>
  <div class="login__container">
    <section class="login__card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Login</span>
        </div>
        <div class="card__body">
          <el-input v-model="username" placeholder="Usuario"></el-input>
          <el-input v-model="password" type="password" placeholder="Contraseña"></el-input>
        </div>
        <section class="card__actions">
          <el-button plain @click="reset">Reset</el-button>
          <el-button plain @click="doLogin" type="success" :disabled="bLogin">Login</el-button>
        </section>
      </el-card>
    </section>
  </div>
</template>
<script>
import loginService from './../services/loginService.js';
import router from '../router.js';
export default {
  name:"login-component",
  data(){
    return{
      username:'',
      password:''
    }
  },
  computed:{
    bLogin:function(){
      let flag = true;
      if(this.username !== '' && this.password !== ''){
        flag = false;
      }
      return flag;
    }    
  },
  methods:{
    reset(){
      this.username="";
      this.password="";
    },
    doLogin(){
      loginService.login(this.username,this.password);
      router.push({
        name:"home"
      });
    }
  }
}
</script>

<style>
  .login__container{
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #f0f9ff;
    background: -moz-linear-gradient(left, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%);
    background: -webkit-linear-gradient(left, #f0f9ff 0%,#cbebff 47%,#a1dbff 100%);
    background: linear-gradient(to right, #f0f9ff 0%,#cbebff 47%,#a1dbff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f9ff', endColorstr='#a1dbff',GradientType=1 );
  }

  .login__card{
    width: 50%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25vh;
  }

  .card__body > .el-input {
    margin-bottom: 15px !important;
  }

</style>
