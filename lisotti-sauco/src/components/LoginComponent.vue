<template>
  <div class="login__container">
    <section class="login__card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Login</span>
        </div>
        <div class="card__body">
          <el-input placeholder="Usuario"></el-input>
          <el-input placeholder="Contraseña"></el-input>
        </div>
      </el-card>
    </section>
  </div>
</template>
<script>
export default {
  name:"login-component"
}
</script>

<style>

</style>
