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
              <el-button
                size="medium"
                @click="clickedChest(chest.idName)"
                class="button"
              >More details</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section v-if="cards.length" class="body__carrousel">
        <span class="arena__body__title">Cards</span>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="card in cards" :key="card._id">
            <div class="carouselImg">
              <img :src="'http://www.clashapi.xyz/images/cards/'+card.idName+'.png'">
            </div>
            <div class="carouselTitle">
              <span>{{card.name}}</span>
            </div>
            <div class="carousel__action">
              <el-button size="medium" @click="clickedCard(card.idName)" class="button">More details</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section v-if="leagues.length" class="body__carrousel">
        <span class="arena__body__title">Leagues</span>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="league in leagues" :key="league._id">
            <div class="carouselImg">
              <img :src="'http://www.clashapi.xyz/images/leagues/'+league.idName+'.png'">
            </div>
            <div class="carouselTitle">
              <span>{{league.name}}</span>
            </div>
            <div class="carousel__action">
              <el-button
                size="medium"
                @click="clickedLeague(league.idName)"
                class="button"
              >More details</el-button>
            </div>
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
      loading: Object,
      arena: Object,
      chests: Array,
      cards: Array,
      leagues: Array
    }
  },
  beforeMount() {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    let route = this.$route.path.split("/");
    apiService.getArena(route[2])
      .then(data => this.displayData(data.data))
      .catch(err => this.handleError(err.response))
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    displayData(data) {
      this.arena = data;
      this.loading.close();
      this.bringChestInfo();
      this.bringCardInfo();
      this.bringLeagueInfo();
    },
    bringChestInfo() {
      this.chests = [];
      for (let chest of this.arena.chests) {
        apiService.getChest(chest)
          .then(data => this.replaceChest(data.data))
          .catch(err => this.handleError(err.response))
      }
    },
    replaceChest(data) {
      apiService.translateImageUrl(data);
      this.chests.push(data);
    },
    handleError(error) {
      this.loading.close();
        if(error !== undefined){
          this.$notify.error({
          title: error.status,
          message: error.statusText
        });
      } else  {
        this.$notify.error({
          title: 'No conecction',
          message: 'There is no internet connection'
        });
      }
    },
    bringCardInfo() {
      this.cards = [];
      for (let card of this.arena.cardUnlocks) {
        apiService.getCard(card)
          .then(data => this.replaceCard(data.data))
          .catch(err => this.handleError(err.response))
      }
    },
    replaceCard(data) {
      this.cards.push(data);
    },
    bringLeagueInfo() {
      this.leagues = [];
      for (let league of this.arena.leagues) {
        apiService.getLeague(league)
          .then(data => this.replaceLeague(data.data))
          .catch(err => this.handleError(err.response))
      }
    },
    replaceLeague(data) {
      this.leagues.push(data);
    },
    clickedCard(value) {
      router.push({ path: `/cards/${value}` });
    },
    clickedChest(value) {
      router.push({ path: `/chests/${value}` });
    },
    clickedLeague(value) {
      router.push({ path: `/leagues/${value}` });
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
  padding: 70px 0 0 125px;
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
.body__carrousel {
  width: 50%;
  float: left;
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
}
.arena__body__title {
  font-size: 18px;
  font-style: italic;
  padding-bottom: 5px;
}
/* Carrousel */
.el-carousel {
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
.carouselImg {
  margin-top: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 35%;
}
.carouselImg img {
  width: 100%;
}
.carouselTitle {
  font-size: 22px;
  margin-top: 5px;
  font-style: italic;
}
.carousel__action{
  position: absolute;
  bottom: 10px;
  right: 20px;
}
@media only screen and (max-width: 996px) {
  .arena__title{
    font-size : 30px;
  }
  .arena__info {
    padding: 70px 0 0 5px;
  }
  .body__carrousel {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    float: none;
  }
  .carouselImg {
    width: 50%;
  }
}
</style>
