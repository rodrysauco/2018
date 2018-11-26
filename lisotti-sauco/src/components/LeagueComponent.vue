<template>
  <div class="container container--shadow" v-if="league._id">
    <section class="league__return">
      <el-button type="text" @click="goBack" class="returnBtn">
        <i class="el-icon-caret-left"></i>Go Back
      </el-button>
    </section>
    <section class="league__header">
      <div class="league__image">
        <img
          :src="'http://www.clashapi.xyz/images/leagues/'+league.idName+'.png'"
          :alt="league.name+' image'"
        >
      </div>
      <div class="league__info">
        <span class="league__title">{{league.name}}</span>
        <div class="league__subtitle">
          <p>Min trophies: {{league.minTrophies}}</p>
          <p>Victory gold: {{league.victoryGold}}</p>
          <p>Arena: {{league.arena}}</p>
        </div>
      </div>
    </section>
    <section v-if="chests.length" class="body__carrousel">
        <span class="arena__body__title">Chests</span>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="chest in chests" :key="chest._id">
            <div class="carouselImg">
              <img :src="'http://www.clashapi.xyz/images/chests/'+chest.url+'.png'">
            </div>
            <div class="carouselTitle">
              <span>{{chest.name}}</span>
            </div>
            <div class="carousel__action">
              <el-button size="medium" @click="clickedChest(chest.idName)" class="button">More details</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
  </div>
</template>
<script>
import apiService from '@/services/apiService';
import router from './../router';
export default {
  name: 'league-component',
  data() {
    return {
      league: Object,
      chests: []
    }
  },
  beforeMount() {
    let route = this.$route.path.split("/");
    apiService.getLeague(route[2])
      .then(data => this.displayData(data.data))
      .catch(err => console.log(err))
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    displayData(data) {
      this.league = data;
      this.bringChestInfo();
    },
    bringChestInfo() {
      this.chests = [];
      for (let chest of this.league.chests) {
        apiService.getChest(chest)
          .then(data => this.replaceChest(data.data))
          .catch(err => console.log(err))
      }
    },
    replaceChest(data) {
      apiService.translateImageUrl(data);
      this.chests.push(data);
    },
  }
}
</script>
<style>
.container--shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.league__return {
  padding-left: 10px;
  border-bottom: 1px solid #8080802e;
}
.returnBtn {
  transition: font-size 1s;
}
.returnBtn:hover {
  font-size: 15px;
}
.league__header {
  padding-left: 5px;
  padding-top: 5px;
}
.league__info {
  display: inline-block;
  vertical-align: top;
  padding: 25px 0 0 5px;
}
.league__title {
  font-size: 36px;
}
.league__subtitle {
  font-size: 18px;
  font-style: italic;
}
</style>
