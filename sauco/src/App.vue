<template>
  <div id="app">
    <section class="header">
      <h3>Ingrese los datos</h3>
      <add-person 
        @name="setName" 
        @edad="setAge" 
        @sexo="setSex" 
        @doIt="agregar"
        :name="persona.nombre"
        :edad="persona.edad"
        :sexo="persona.sexo"/>
    </section>
    <section class="bodyList">
        <person-list 
        :people=people 
        @filter="filterData"
        @delete="errase"
        @edit="editMe"/>
    </section>
    <section v-if="editable.nombre !== undefined" class="editPart">
        <add-person 
        :name="editable.nombre"
        :edad="editable.edad"
        :sexo="editable.sexo"/>  
    </section>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PersonList from './components/PersonList.vue'
import AddPerson from './components/AddPerson.vue'
export default {
  name: 'app',
  components: {
    HelloWorld,
    PersonList,
    AddPerson
  },
  data() {
    return {
      personas: [],
      editable: {},
      filter: "",
      persona: {
        nombre: "",
        edad: 0,
        sexo: ""
      }
    }
  },
  computed: {
    people: function () {
      let filteredPeople;
      if (this.filter === "") {
        filteredPeople = this.personas;
      } else {
        filteredPeople = this.personas.filter(persona => persona.sexo === this.filter);
      }
      return filteredPeople;
    }
  },
  methods: {
    setName(name) {
      this.persona.nombre = name;
    },
    setAge(edad) {
      this.persona.edad = edad;
    },
    setSex(sexo){
      this.persona.sexo = sexo;
    },
    agregar() {
      if (this.persona.nombre !== '' && this.persona.edad !== "" && this.persona.sexo !== "") {
        this.personas.push({
          nombre: this.persona.nombre,
          edad: this.persona.edad,
          sexo: this.persona.sexo
        });
        this.persona.nombre = "";
        this.persona.edad = "";
        this.persona.sexo = "";
      } else {
        alert("Complete todos los campos correctamente");
      }
    },
    filterData(sex){
      this.filter = sex;
    },
    errase(index){
      this.personas.splice(index,1);
    },
    editMe(index){
      this.editable = this.personas[index];
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header{
  position: relative;
}
.bodyList{
  width: 60%;
  display: inline-block;
}
.editPart{
  box-sizing: border-box;
  vertical-align: top;
  margin-top: 30px;
  width: 250px;
  text-align: right;
  display: inline-block  
}
</style>
