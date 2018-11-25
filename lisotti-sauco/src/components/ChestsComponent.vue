<template>
  <div class="container">
    <recard-component v-if="filteredChests.length"
      v-for="chest in filteredChests" 
      :key="chest.idName"
      :url="'http://www.clashapi.xyz/images/chests/' + chest.url + '.png'"
      :name="chest.name"
      :title="chest.name"
      :subtitle="'Arena: '+ chest.arena"
      @clicked="redirectTo(chest.idName)">
    </recard-component>
    <el-pagination
      @current-change="currentChange"
      :page-size="14"
      :page-count="chests.length"
      layout="prev, pager, next"
      :total="chests.length">
    </el-pagination>
  </div>
</template>
<script>
import RecardComponent from './RecardComponent';
import router from './../router';
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
    redirectTo(key){
      router.push({
        name : 'chest',
        params : {
          id : key
        }
      })
    },
  },
  computed: {
    filteredChests: function() {
      return this.chests.slice((this.currentPage * 14) - 14, (this.currentPage * 14));
    }
  },
  beforeMount() {
    apiService
      .getAllChests()
      .then(data => {
        this.chests = data.data;
        this.chests = apiService.translateImagesUrl(this.chests);
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

