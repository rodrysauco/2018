<template>
  <div class="container container--shadow" v-if="arena._id">
    <section class="arena__return">
      <el-button type="text" @click="goBack" class="returnBtn">
        <i class="el-icon-caret-left"></i>Go Back
      </el-button>
    </section>
    <section class="arena__header">
      <div class="arena__image">
        <img
          :src="'http://www.clashapi.xyz/images/arenas/'+arena.idName+'.png'"
          :alt="arena.name+' image'"
        >
      </div>
      <div class="arena__info">
        <span class="arena__title">{{arena.name}}</span>
        <div class="arena__subtitle">
          <p>N°: {{arena.number}}</p>
          <p>Gold: {{arena.victoryGold}}</p>
          <p>Trophies: {{arena.minTrophies}}</p>
        </div>
      </div>
    </section>
    <div class="arena__body">
      <section class="body__carrousel">
        <span class="arena__body__title">Chests</span>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="chest in arena.chests" :key="chest">
            <h3>{{chest}}</h3>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section class="body__carrousel">
        <span class="arena__body__title">Cards</span>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="card in arena.cardUnlocks" :key="card">
            <h3>{{card}}</h3>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section class="body__carrousel">
        <span class="arena__body__title">Leagues</span>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="league in arena.leagues" :key="league">
            <h3>{{league}}</h3>
          </el-carousel-item>
        </el-carousel>
      </section>
    </div>
  </div>
</template>
<script>
import apiService from '@/services/apiService';
import router from './../router';
export default {
  name: 'arena-component',
  data() {
    return {
      arena: Object,
    }
  },
  beforeMount() {
    let route = this.$route.path.split("/");
    apiService.getArena(route[2])
      .then(data => this.arena = data.data)
      .catch(err => console.log(err))
  },
  methods: {
    goBack() {
      router.push({
        name: 'arenas'
      })
    }
  }
}
</script>
<style>
.container--shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.arena__return {
  padding-left: 10px;
  border-bottom: 1px solid #8080802e;
}
.returnBtn {
  transition: font-size 1s;
}
.returnBtn:hover {
  font-size: 15px;
}
.arena__header {
  padding-left: 5px;
  padding-top: 5px;
}
.arena__image {
  width: 50%;
  max-width: 400px;
  display: inline-block;
}
.arena__image img {
  width: 100%;
}
.arena__info {
  display: inline-block;
  vertical-align: top;
  padding: 70px 0 0 5px;
}
.arena__title {
  font-size: 36px;
}
.arena__subtitle {
  font-size: 18px;
  font-style: italic;
}
.arena__body__chests {
  width: 50%;
  display: inline-block;
}
.body__carrousel{
  width: 50%;
  float: left;
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
}
.arena__body__title{
  font-size: 18px;
  font-style: italic;
  padding-bottom: 5px;
}
/* Carrousel */
.el-carousel{
  margin-top: 5px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
