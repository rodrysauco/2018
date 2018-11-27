<template>
  <div class="container">
    <section class="home__header">
      <span class="homeTitle">
        Clash Royale
      </span>
    </section>
    <section class="home__body">
      <p>
        Clash Royale is a tower rush video game developed and published by Supercell. 
        The game combines elements from collectible card games, 
        tower defense, and multiplayer online battle arena. 
        The game was released globally on March 2, 2016. Clash Royale 
        reached $1 billion in revenue in less than a year on the market.
      </p>
      <p>
        The objective is to destroy the most amount of opposing towers, 
        with the destruction of the "King's Tower" being an instantaneous win. The 
        game can be played 1v1 or 2v2. Also, the players are ranked by the number of 
        trophies (with a max. rank of level 13).
      </p>
      <div class="home__body--cards">
        <section class="home__header homeSubtitle"> Cards</section>
        <p>
          Cards are the core of this game. A card can be playable troops, buildings 
          and spells. Prior to each battle, the player has to choose 8 cards to attack 
          and defend against their opponent's cards. When the game starts, both players 
          begin with four randomly chosen cards from their deck of eight. Each card cost 
          certain amount of elixir to play.
        </p>
        <p>
          When the game started, there were only 3 species of cards: Common, Rare and Epic. 
          In this year, they added a new specie : Legendary. Each card has a level that 
          is similar to the player level. Also in this year trade tokens was introduced to 
          the game, a feature that was very claimed for clans.
        </p>
      </div>
      <div class="home__body--clanWars">
        <section class="home__header homeSubtitle">Clan Wars</section>
        <p>
          During the April 25, 2018 update, a new Clan Wars feature was added. 
          Clan Wars consists of five clans attacking other clans to get rewards 
          in the form of special chests. The clan with the most wins would win 
          the clan war. Players would receive a clan war chest bases on the best 
          war in a season of fourteen days. Clan Chests were also removed in the 
          update and replaced with the new Clan War chests. Clan war chests gets 
          improved as the clan climbs up the war leagues. To play a clan war, the 
          clan must have a minimum of 10 players that are level 8 and above. One 
          clan war is separated into two days: the 'collection day' and 'war day'. 
          Players receive a war bounty upon successful completion of their war day 
          battle.
        </p>
      </div>
      <div class="home__body--leagues">
        <section class="home__header homeSubtitle">Leagues</section>
        <p>
          In March 2017, "Leagues" were added to the game. Once above 4000 trophies, 
          players are placed in one of nine different leagues ranging from Challenger 
          I to Ultimate Champion. At the end of each season, players receive rewards 
          based on the highest league achieved during that season. Another feature 
          that was introduced is Clan Battles. Two players get to battle side by side 
          with another member of their clan facing off against two other opponents 
          from another clan. 
        </p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name:'home-component',
  methods:{
    loading(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    }
  },
  beforeMount(){
    this.loading();
  }
}
</script>
<style>
.home__header{
  border-bottom: 1px solid #dadada
}
  .homeTitle{
    font-size: 36px;
    font-style: italic;
  }
  .homeSubtitle{
    font-size: 22px;
    font-style: italic;
  }
</style>