<template>
  <div class="cards__container">
    <el-table :data="cards" style="width: 100%">
      <el-table-column prop="name" label="Name" width="120"></el-table-column>
      <el-table-column prop="elixirCost" label="Cost" width="120"></el-table-column>
      <el-table-column prop="type" label="Type" width="120"></el-table-column>
      <el-table-column prop="rarity" label="Rarity" width="120"></el-table-column>
      <el-table-column prop="arena" label="Arena" width="120"></el-table-column>
      <el-table-column prop="description" label="Description" width="500"></el-table-column>
      <el-table-column label="" width="120"><template slot-scope="scope">
          <el-button type="text" @click="detailCard(scope.row.idName)" size="small">Detail</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: "cards-component",
    data() {
      return {
        cards: [],
        errors: []
      }
    },
    methods: {
      detailCard(idName) {
        this.$router.push({
          name: 'card',
          params: {
            idName: idName
          }
        })
      },
      checkStatus() {
        if (this.$route.params.idName !== undefined) {
          this.axios.get("http://www.clashapi.xyz/api/cards/" + this.$route.params.idName)
            .then(response => {
              this.cards = response
            })
            .catch(error => {
              this.errors = error
            })
        }
      }
    },
    beforeMount() {
      this.checkStatus();
    },
    created() {
      this.axios.get("http://www.clashapi.xyz/api/cards")
        .then(response => {
          this.cards = response.data
        })
        .catch(error => {
          this.errors = error
        })
    }
  }
</script>

<style>

</style>