<template>
  <el-card class="recard">
    <div class="recard__image" v-if="url">
      <img v-if="title === 'Season Reward Chest'" src="./../media/chest.png" :alt="name+' image'">
      <img v-else :src="url" :alt="name+' image'">
    </div>
    <div class="recard__content">
      <section class="recard__title">
        <span>{{title}}</span>
      </section>
      <section class="recard__subtitle">
        <span>{{subtitle}}</span>
      </section>
    </div>
    <div class="recard__action">
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
.recard {
  width: 215px;
  margin-right: 2%;
  margin-bottom: 2%;
  height: 300px;
  float: left;
  position: relative;
  transition: top ease 1s !important;
}
.recard:hover {
  top: -5px;
}
.recard__image {
  height: 150px;
  text-align: center;
}
.recard__image img {
  height: 100%;
}
.recard__title {
  font-size: 25px;
}
.recard__subtitle {
  font-size: 14px;
  font-style: italic;
  color: grey;
}
.recard__action {
  position: absolute;
  bottom: 0;
  right: 15px;
}
</style>

