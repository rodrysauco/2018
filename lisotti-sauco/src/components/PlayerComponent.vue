<template>
  <div class="container container--shadow" v-if="player._id">
    <section class="player__return">
      <el-button type="text" @click="goBack" class="returnBtn">
        <i class="el-icon-caret-left"></i>Go Back
      </el-button>
    </section>
    <section class="player__header">
      <el-row>
        <el-col :span="12" class="player__image">
          <img src="./../media/player.png" :alt="player.name+' image'">
        </el-col>
        <el-col :span="12">
            <div class="player__subtitle">
              <p>Level: {{player.level}}</p>
              <p>Max exp: {{player.maxExp}}</p>
            </div>
          </el-col>
      </el-row>
      <el-row class="player__info">
        <span class="player__title">{{player.name}}</span>
          <el-col :span="12">
            <el-col :span="6" class="player__subtitle">
              <p>Arena Towers:</p>
            </el-col>
            <el-col :span="18" class="player__subtitle">
              <p>Damage: {{player.arenaTowers.damage}}</p>
              <p>Hit speed: {{player.arenaTowers.hitSpeed}}</p>
              <p>Hit points: {{player.arenaTowers.hitPoints}}</p>
              <p>Range: {{player.arenaTowers.range}}</p>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="6" class="player__subtitle">
              <p>King Towers:</p>
            </el-col>
            <el-col :span="18" class="player__subtitle">
              <p>Damage: {{player.kingsTower.damage}}</p>
              <p>Hit speed: {{player.kingsTower.hitSpeed}}</p>
              <p>Hit points: {{player.kingsTower.hitPoints}}</p>
              <p>Range: {{player.kingsTower.range}}</p>
            </el-col>
          </el-col>
                </el-row>
    </section>
  </div>
</template>
<script>
  import apiService from '@/services/apiService';
  import router from './../router';
  export default {
    name: 'player-component',
    data() {
      return {
        player: Object,
      }
    },
    beforeMount() {
      let route = this.$route.path.split("/");
      apiService.getPlayer(route[2])
        .then(data => this.player = data.data)
        .catch(err => console.log(err))
    },
    methods: {
      goBack() {
        router.go(-1);
      }
    }
  }
</script>
<style>
  .container--shadow {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .player__return {
    padding-left: 10px;
    border-bottom: 1px solid #8080802e;
  }

  .returnBtn {
    transition: font-size 1s;
  }

  .returnBtn:hover {
    font-size: 15px;
  }

  .player__header {
    padding-left: 5px;
    padding-top: 5px;
  }

  .player__info {
    /*display: inline-block;*/
    vertical-align: top;
    padding: 25px 0 0 5px;
  }

  .player__title {
    font-size: 36px;
  }

  .player__subtitle {
    font-size: 18px;
    font-style: italic;
  }
</style>