<template>
  <div class="container" v-if="players.length">
    <recard-component
      v-for="player in players"
      :key="player.level"
      :url="'/img/player.849c79dc.png'"
      :name="''+player.level"
      :title="'Level ' + player.level"
      :subtitle="'Max exp: '+player.maxExp"
      @clicked="redirectTo(player.idName)"
    ></recard-component>
  </div>
</template>
<script>
import RecardComponent from './RecardComponent';
import router from '../router.js';
import apiService from "./../services/apiService.js";
export default {
  name: "players-component",
  components: {
    RecardComponent
  },
  data() {
    return {
      loading: Object,
      players: []
    };
  },
  methods: {
    redirectTo(key) {
      router.push({
        name: 'player',
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
    fetchingData(data) {
      this.loading.close();
      this.players = data;
    }
  },
  beforeMount() {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    apiService
      .getAllPlayers()
      .then(data => this.fetchingData(data.data))
      .catch(err => this.handleError(err.response));
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

