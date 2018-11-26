<template>
  <div class="container" v-if="leagues.length">
    <recard-component 
      v-for="league in leagues" 
      :key="league.idName"
      :url="'http://www.clashapi.xyz/images/leagues/'+league.idName+'.png'"
      :name="league.name"
      :title="league.name"
      :subtitle="'Victory Gold: '+league.victoryGold"
      @clicked="redirectTo(league.idName)">
    </recard-component>
  </div>
</template>
<script>
import RecardComponent from './RecardComponent';
import { Loading } from 'element-ui'
import router from '../router.js';
import apiService from "./../services/apiService.js";
export default {
  name: "leagues-component",
  components: {
    RecardComponent
  },
  data() {
    return {
      loading: Object,
      leagues: []
    };
  },
  methods:{
    redirectTo(key){
      router.push({
        name : 'league',
        params : {
          id : key
        }
      })
    },
    displayData(data){
      this.leagues = data;
      this.loading.close();
    }
  },
  beforeMount() {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner:'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    apiService
      .getAllLeagues()
      .then(data => this.displayData(data.data))
      .catch(err => console.log(err));
  }
};
</script>
<style>
.container {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
</style>

