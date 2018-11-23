<template>
  <div class="container">
    <recard-component v-if="filteredChests.length"
      v-for="chest in filteredChests" 
      :key="chest.idName"
      :url="'http://www.clashapi.xyz/images/chests/' + chest.url + '.png'"
      :name="chest.name"
      :title="chest.name"
      :subtitle="'Arena: '+ chest.arena">
    </recard-component>
    <el-pagination
      @current-change="currentChange"
      :page-size="12"
      :page-count="chests.length"
      layout="prev, pager, next"
      :total="chests.length">
    </el-pagination>
  </div>
</template>
<script>
import RecardComponent from './RecardComponent'
import apiService from "./../services/apiService.js";
export default {
  name: "chests-component",
  components: {
    RecardComponent
  },
  data() {
    return {
      chests: [],
      currentPage: 1,
    };
  },
  methods: {
    currentChange(page){
      this.currentPage = page;
    },
  },
  computed: {
    filteredChests: function() {
      return this.chests.slice((this.currentPage * 12) - 12, (this.currentPage * 12));
    }
  },
  beforeMount() {
    apiService
      .getAllChests()
      .then(data => {
        this.chests = data.data;
        this.chests.forEach(function(chest) {
        chest.url = chest.idName.replace("-"+chest.arena,"");
        if(chest.idName.indexOf("'") != -1){
          chest.url = chest.url.replace(/'/gi ,"");
        }
        if(chest.league){
          chest.url = chest.url.replace("-"+chest.league,"");
        }
        })
      })
      .catch(err => console.log(err));
  }
};
</script>
<style>
.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
.el-pagination {
  float: left;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  }
</style>

