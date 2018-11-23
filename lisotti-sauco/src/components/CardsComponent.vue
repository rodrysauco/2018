<template>
  <div class="container">
    <recard-component v-if="filteredCards.length"
      v-for="card in filteredCards" 
      :key="card.idName" 
      :url="'http://www.clashapi.xyz/images/cards/'+card.idName+'.png'"
      :name="card.name"
      :title="card.name"
      :subtitle="'Rarity: '+ card.rarity">
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
import RecardComponent from './RecardComponent'
import apiService from "./../services/apiService.js";
export default {
  name: "cards-component",
  components: {
    RecardComponent
  },
  data() {
    return {
      cards: [],
      currentPage: 1,
    };
  },
  methods: {
    currentChange(page){
      this.currentPage = page;
    }
  },
  computed: {
    filteredCards: function() {
      return this.cards.slice((this.currentPage * 12) - 12, (this.currentPage * 12));
    }
  },
  beforeMount() {
    apiService
      .getAllCards()
      .then(data => (this.cards = data.data))
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

