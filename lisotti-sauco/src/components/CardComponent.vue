<template>
  <el-card class="card">
    <div class="card__image">
      <img :src="url" :alt="name+' image'">
    </div>
    <div class="card__content">
      <section class="card__title">
        <span>{{title}}</span>
      </section>
      <section class="card__subtitle">
        <span>Victory Gold: {{subtitle}}</span>
      </section>
    </div>
    <div class="card__action">
      <el-button type="text" @click="clicked" class="button">More details</el-button>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'card-component',
  props: {
    url: String,
    name: String,
    title: String,
    subtitle: String
  },
  methods:{
    clicked(){
      this.$emit("clicked");
    }
  }
}
</script>
<style>
.card {
  width: 30%;
  margin-right: 2%;
  margin-bottom: 2%;
  height: 425px;
  float: left;
  position: relative;
}
.card__image {
  height: 300px;
  text-align: center;
}
.card__image img {
  height: 100%;
}
.card__title {
  font-size: 25px;
}
.card__subtitle {
  font-size: 14px;
  font-style: italic;
  color: grey;
}
.card__action {
  position: absolute;
  bottom: 0;
  right: 15px;
}
@media only screen and (max-width: 800px) {
  .card {
    height: 300px;
  }
  .card__image {
    height: 150px;
  }
}
</style>

