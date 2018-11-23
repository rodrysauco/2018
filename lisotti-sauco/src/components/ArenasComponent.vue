<template>
  <div class="container" v-if="arenas.length">
    <card-component 
      v-for="arena in arenas" 
      :key="arena.idName" 
      :url="'http://www.clashapi.xyz/images/arenas/'+arena.idName+'.png'"
      :name="arena.name"
      :title="arena.name"
      :subtitle="'Victory Gold: '+arena.victoryGold">
    </card-component>
  </div>
</template>
<script>
import CardComponent from './CardComponent'
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
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>

