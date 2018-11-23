<template>
  <div class="container" v-if="arenas.length">
    <card-component 
      v-for="arena in arenas" 
      :key="arena.idName" 
      :url="'http://www.clashapi.xyz/images/arenas/'+arena.idName+'.png'"
      :name="arena.name"
      :title="arena.name"
      :subtitle="'Victory Gold: '+arena.victoryGold"
      @clicked="redirectTo(arena.idName)">
    </card-component>
  </div>
</template>
<script>
import CardComponent from './CardComponent';
import router from '../router.js';
import apiService from "./../services/apiService.js";
export default {
  name: "arenas-component",
  components: {
    CardComponent
  },
  data() {
    return {
      arenas: []
    };
  },
  methods:{
    redirectTo(key){
      router.push({
        name : 'arena',
        params : {
          id : key
        }
      })
    },
  },
  beforeMount() {
    apiService
      .getAllArenas()
      .then(data => (this.arenas = data.data))
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

