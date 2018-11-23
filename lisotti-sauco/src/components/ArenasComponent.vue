<template>
  <div class="container" v-if="arenas.length">
    <recard-component 
      v-for="arena in arenas" 
      :key="arena.idName" 
      :url="'http://www.clashapi.xyz/images/arenas/'+arena.idName+'.png'"
      :name="arena.name"
      :title="arena.name"
      :subtitle="'Victory Gold: '+arena.victoryGold"
      @clicked="redirectTo(arena.idName)">
    </recard-component>
  </div>
</template>
<script>
import RecardComponent from './RecardComponent';
import router from '../router.js';
import apiService from "./../services/apiService.js";
export default {
  name: "arenas-component",
  components: {
    RecardComponent
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

