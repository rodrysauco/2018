<template>
  <div class="container">
    <recard-component v-if="filteredCards.length"
      v-for="card in filteredCards" 
      :key="card.idName" 
      :url="'http://www.clashapi.xyz/images/cards/'+card.idName+'.png'"
      :name="card.name"
      :title="card.name"
      :subtitle="'Rarity: '+ card.rarity"
      @clicked="redirectTo(card.idName)">
    </recard-component>
    <el-pagination
      @current-change="currentChange"
      :page-size="12"
      :page-count="cards.length"
      layout="prev, pager, next"
      :total="cards.length">
    </el-pagination>
  </div>
</template>
<script>
import RecardComponent from './RecardComponent';
import { Loading } from 'element-ui';
import router from '../router.js';
import apiService from "./../services/apiService.js";
export default {
  name: "cards-component",
  components: {
    RecardComponent
  },
  data() {
    return {
      loading : Object,
      cards: [],
      currentPage: 1,
    };
  },
  methods: {
    currentChange(page){
      this.currentPage = page;
    },
    redirectTo(key){
      router.push({
        name : 'card',
        params : {
          id : key
        }
      });
    },
     displayData(data) {
      this.cards = data;
      this.loading.close();
     }
  },
  computed: {
    filteredCards: function() {
      return this.cards.slice((this.currentPage * 12) - 12, (this.currentPage * 12));
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
      .getAllCards()
      .then(data => this.displayData(data.data))
      .catch(err => console.log(err));
  }
};
</script>
<style>
.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font-family: Helvetica, sans-serif;
}
.el-pagination {
  float: left;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  }
</style>

