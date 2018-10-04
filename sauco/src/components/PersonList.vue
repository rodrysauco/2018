<template>
  <div class="container">
    <label for="sex">Mostrar: </label>
    <select id="sex" @change="filtering" class="pointer">
      <option value="" selected>Todos</option>
      <option value="Masculino">Masculino</option>
      <option value="Femenino">Femenino</option>
      <option value="Pansexual">Pansexual</option>
      <option value="Hermafrodita">Hermafrodita</option>
      <option value="Otro">Otro</option>
    </select>
    <div v-if=" 0 < people.length ">
      <ul v-for="(persona,index) in people">
        <person-item :people="persona" :i="index" @edit="editItem" @delete="deleteItem"></person-item>
      </ul>
    </div>
    <div v-else class="noPeople">
      No se hallaron resultados
    </div>

  </div>
</template>

<script>
  import PersonItem from './PersonItem.vue';
  export default {
    name: 'person-list',
    components: {
      PersonItem
    },
    props: {
      people: Array,
    },
    methods: {
      filtering(event) {
        this.$emit('filter', event.target.value);
      },
      deleteItem(index) {
        this.$emit('delete', index);
      },
      editItem(index) {
        this.$emit('edit', index);
      }
    }
  }
</script>

<style>
  .container {
    margin: 15px 0 0 10px;
  }
  .noPeople{
    padding: 20px;
  }
  .pointer{
    cursor: pointer;
  }
</style>