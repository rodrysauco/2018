<template>
  <div v-if="people">
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
        <ul v-for="persona in this.people" :key="persona.id">
          <person-item :people="persona" :i="persona.id" @edit="editItem" @delete="deleteItem"></person-item>
        </ul>
      </div>
      <div v-else class="noPeople">
        No se hallaron resultados
      </div>

    </div>
  </div>
  <div v-else>No hay personas almacenadas</div>
</template>

<script>
import PersonItem from './PersonItem.vue';
import router from '../router.js'
import pplService from "@/services/pplService";

export default {
  name: 'person-list',
  components: {
    PersonItem
  },
  data() {
    return {
      personas: [],
      filter: "",
    }
  },
  computed: {
    people: function () {
      let filteredPeople;
      if (this.filter === "") {
        filteredPeople = this.personas;
      } else {
        filteredPeople = this.personas.filter(
          persona => persona.sexo === this.filter
        );
      }
      return filteredPeople;
    }
  },
  mounted: function () {
    this.personas = pplService.getAll();
  },
  methods: {
    filtering(event) {
      this.filter = event.target.value;
    },
    deleteItem(i) {
      let toDelete = this.personas.find(p => p.id === i);
      let index = this.personas.indexOf(toDelete);
      this.personas.splice(index, 1);
      pplService.saveAll(this.personas);
    },
    editItem(i) {
      router.push({ name : 'user', params : {id : i}})
    }
  }
}
</script>

<style>
.container {
  margin: 15px 0 0 10px;
}
.noPeople {
  padding: 20px;
}
.pointer {
  cursor: pointer;
}
</style>