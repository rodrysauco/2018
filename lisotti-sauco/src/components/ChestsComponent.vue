<template>
  <div class="container">
    <recard-component
      v-for="chest in filteredChests"
      :key="chest.idName"
      :url="'http://www.clashapi.xyz/images/chests/' + chest.url + '.png'"
      :name="chest.name"
      :title="chest.name"
      :subtitle="'Arena: '+ chest.arena"
      @clicked="redirectTo(chest.idName)"
    ></recard-component>
    <el-pagination
      @current-change="currentChange"
      :page-size="12"
      :page-count="chests.length"
      layout="prev, pager, next"
      :total="chests.length"
    ></el-pagination>
  </div>
</template>
<script>
import RecardComponent from './RecardComponent';
import router from './../router';
import apiService from "./../services/apiService.js";
import loginService from "./../services/loginService.js";
export default {
  name: "chests-component",
  components: {
    RecardComponent
  },
  data() {
    return {
      loading: Object,
      chests: [],
      currentPage: 1,
    };
  },
  methods: {
    checkStatus() {
      let credentials = loginService.getCredentials();
      if (credentials === null) {
        router.push({ name: "login" });
      }
    },
    currentChange(page) {
      this.currentPage = page;
    },
    redirectTo(key) {
      router.push({
        name: 'chest',
        params: {
          id: key
        }
      })
    },
    handleError(error) {
      this.loading.close();
      this.$notify.error({
        title: error.status,
        message: error.statusText
      });
    },
    displayData(data) {
      this.chests = data;
      this.loading.close();
      this.chests = apiService.translateImagesUrl(this.chests);

    }
  },
  computed: {
    filteredChests: function () {
      return this.chests.slice((this.currentPage * 12) - 12, (this.currentPage * 12));
    }
  },
  beforeMount() {
    this.checkStatus();
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    apiService
      .getAllChests()
      .then(data => this.displayData(data.data))
      .catch(err => this.handleError(err.response));
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

