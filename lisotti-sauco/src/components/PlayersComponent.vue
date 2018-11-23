<template>
  <div class="container" v-if="players.length">
    <recard-component 
      v-for="player in players" 
      :key="player.level"
      :url="'./../media/logo.png'"
      :name="''+player.level"
      :title="'Level ' + player.level"
      :subtitle="'Max exp: '+player.maxExp"
      @clicked="redirectTo(player.idName)">
    </recard-component>
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
      players: []
    };
  },
  methods:{
    redirectTo(key){
      router.push({
        name : 'player',
        params : {
          id : key
        }
      })
    },
  },
  beforeMount() {
    apiService
      .getAllPlayers()
      .then(data => (this.players = data.data))
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

