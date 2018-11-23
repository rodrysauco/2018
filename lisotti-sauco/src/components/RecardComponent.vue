<template>
  <el-card class="card">
    <div class="card__image" v-if="url">
      <img :src="url" :alt="name+' image'">
    </div>
    <div class="card__content">
      <section class="card__title">
        <span>{{title}}</span>
      </section>
      <section class="card__subtitle">
        <span>{{subtitle}}</span>
      </section>
    </div>
    <div class="card__action">
      <el-button type="text" @click="clicked" class="button">More details</el-button>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'recard-component',
  props: {
    url: String,
    name: String,
    title: String,
    subtitle: String
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    }
  }
}
</script>
<style>
.card {
  width: 215px;
  margin-right: 2%;
  margin-bottom: 2%;
  height: 300px;
  float: left;
  position: relative;
  transition: top ease 1s !important;
}
.card:hover {
  top: -5px;
}
.card__image {
  height: 150px;
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
</style>

