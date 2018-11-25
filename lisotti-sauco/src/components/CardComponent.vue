<template>
  <div class="container container--shadow" v-if="card._id">
    <section class="card__return">
      <el-button type="text" @click="goBack" class="returnBtn">
        <i class="el-icon-caret-left"></i>Go Back
      </el-button>
    </section>
    <section class="card__header">
      <div class="card__image">
        <img
          :src="'http://www.clashapi.xyz/images/cards/'+card.idName+'.png'"
          :alt="card.name+' image'"
        >
      </div>
      <div class="card__info">
        <span class="card__title">{{card.name}}</span>
        <div class="card__subtitle">
          <p>Rarity: {{card.rarity}}</p>
          <p>Type: {{card.type}}</p>
          <p>Elixir cost: {{card.elixirCost}}</p>
          <p>Arena: {{card.arena}}</p>
          <p>Description: {{card.description}}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import apiService from '@/services/apiService';
import router from './../router';
export default {
  name: 'card-component',
  data() {
    return {
      card: Object,
    }
  },
  beforeMount() {
    let route = this.$route.path.split("/");
    apiService.getCard(route[2])
      .then(data => this.card = data.data)
      .catch(err => console.log(err))
  },
  methods: {
    goBack() {
      router.push({
        name: 'cards'
      })
    }
  }
}
</script>
<style>
.container--shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.card__return {
  padding-left: 10px;
  border-bottom: 1px solid #8080802e;
}
.returnBtn {
  transition: font-size 1s;
}
.returnBtn:hover {
  font-size: 15px;
}
.card__header {
  padding-left: 5px;
  padding-top: 5px;
}
.card__info {
  display: inline-block;
  vertical-align: top;
  padding: 25px 0 0 5px;
}
.card__title {
  font-size: 36px;
}
.card__subtitle {
  font-size: 18px;
  font-style: italic;
}
</style>
