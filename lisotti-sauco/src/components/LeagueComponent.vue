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
    <section v-if="chests.length" class="league__chest">
      <h4 class="league__chest__title">Chests</h4>
      <recard-component
        class="recard--center"
        v-for="chest in chests"
        :key="chest.idName"
        :url="'http://www.clashapi.xyz/images/chests/' + chest.url + '.png'"
        :name="chest.name"
        :title="chest.name"
        :subtitle="'Arena: '+ chest.arena"
        @clicked="clickedChest(chest.idName)"
      ></recard-component>
    </section>
  </div>
</template>
<script>
import apiService from '@/services/apiService';
import RecardComponent from './RecardComponent';
import router from './../router';
export default {
  name: 'league-component',
  components: {
    RecardComponent
  },
  data() {
    return {
      loading: Object,
      league: Object,
      chests: []
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
    apiService.getLeague(route[2])
      .then(data => this.displayData(data.data))
      .catch(err => this.handleError(err.response))
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    displayData(data) {
      this.league = data;
      this.bringChestInfo();
      this.loading.close();
    },
    bringChestInfo() {
      this.chests = [];
      for (let chest of this.league.chests) {
        apiService.getChest(chest)
          .then(data => this.replaceChest(data.data))
          .catch(err => this.handleError(err.response))
      }
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
    replaceChest(data) {
      apiService.translateImageUrl(data);
      this.chests.push(data);
    },
    clickedChest(value) {
      router.push({
        path: `/chests/${value}`
      });
    }
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

  .league__chest__title {
    text-align: center;
  }

  .recard--center {
    float: none;
    margin-left: auto;
    margin-right: auto;
  }

  .league__image {
    width: 100%;
    max-width: 200px;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
  }

  .league__image img {
    width: 100%;
  }

  .league__title {
    font-size: 36px;
  }

  .league__subtitle {
    font-size: 18px;
    font-style: italic;
  }
</style>