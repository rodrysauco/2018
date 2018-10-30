<template>
  <div v-if="people">
    <div class="container">
      <div>
        <span class="titleList">Filtrar</span>
        <el-dropdown @command="filtering">
          <span class="el-dropdown-link">
            <el-button>{{filter}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Todos">Todos</el-dropdown-item>
            <el-dropdown-item command="Masculino">Masculino</el-dropdown-item>
            <el-dropdown-item command="Femenino">Femenino</el-dropdown-item>
            <el-dropdown-item command="Pansexual">Pansexual</el-dropdown-item>
            <el-dropdown-item command="Hermafrodita">Hermafrodita</el-dropdown-item>
            <el-dropdown-item command="Otro">Otro</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-if=" 0 < people.length ">
        <el-table :data="this.people">
          <el-table-column label="Edad" prop="edad"></el-table-column>
          <el-table-column label="Nombre" prop="nombre"></el-table-column>
          <el-table-column label="Sexo" prop="sexo"></el-table-column>
          <el-table-column label="Acciones">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" type="success" @click="editItem(scope.row)" circle></el-button>
              <el-button icon="el-icon-delete" type="danger" @click="deleteItem(scope.row)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="noPeople">
        <el-card shadow="always">
          No hay personas almacenadas
        </el-card>
      </div>

    </div>
  </div>
  <div v-else>
    <el-card shadow="always">
      No hay personas almacenadas
    </el-card>
  </div>
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
        filter: "Todos",
      }
    },
    computed: {
      people: function () {
        let filteredPeople;
        if (this.filter === "Todos") {
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
        this.filter = event;
      },
      deleteItem(row) {
        let toDelete = this.personas.find(p => p.id === row.id);
        let index = this.personas.indexOf(toDelete);
        this.personas.splice(index, 1);
        pplService.saveAll(this.personas);
      },
      editItem(row) {
        router.push({ name: 'user', params: { id: row.id } })
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

  .titleList {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    margin: 0 30px 0 10px;
  }

  .pointer {
    cursor: pointer;
  }
</style>