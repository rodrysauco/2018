<template>
    <div class="container" v-if="arenas.length">
        
    </div>
</template>
<script>
import apiService from "./../services/apiService.js";
export default {
  name: "arenas-component",
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
</style>

