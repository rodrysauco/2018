<template>
  <div id="app">
    <section class="header">
      <h3>Ingrese los datos</h3>
      <add-person 
        @name="setName" 
        @edad="setAge" 
        @sexo="setSex" 
        @doIt="agregar"
        :errors="errores"
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
    <section v-if="editable.persona !== undefined" class="editPart">
        <add-person
        @name="editName" 
        @sexo="editSex"
        @edad="editAge"
        @doIt="confirmEdition"
        :errors="errorsEdit"
        :name="editable.persona.nombre"
        :edad="editable.persona.edad"
        :sexo="editable.persona.sexo"/>  
    </section>
  </div>
</template>

<script>
import PersonList from './components/PersonList.vue'
import AddPerson from './components/AddPerson.vue'
export default {
  name: 'app',
  components: {
    PersonList,
    AddPerson
  },
  data() {
    return {
      errores: [],
      errorsEdit: [],
      personas: [],
      editable: {
        id : Number,
        persona: undefined
      },
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
      let flag = this.checkForm(1);
      if(flag){
        if (this.persona.nombre !== '' && this.persona.edad !== "" && this.persona.sexo !== "") {
        this.personas.push({
          nombre: this.persona.nombre,
          edad: this.persona.edad,
          sexo: this.persona.sexo
        });
        this.persona.nombre = "";
        this.persona.edad = "";
        this.persona.sexo = "";
      }
      }
    },
    checkForm(type){
      let err = [];
      if(type == 1){
        if (!this.persona.nombre) {
          err.push('Falta el nombre');
        }
        if (!this.persona.edad) {
          err.push('Falta la edad');
        }
        if (!this.persona.sexo) {
          err.push('Falta el sexo');
        }
        this.errores = err;
        if (this.persona.nombre && this.persona.edad && this.persona.sexo) {
          return true;
        }
      } else {
         if (!this.editable.persona.nombre) {
          err.push('Falta el nombre');
        }
        this.errorsEdit = err;
        if (this.editable.persona.nombre && this.editable.persona.edad && this.editable.persona.sexo) {
          return true;
        }       
      }
      
    },
    filterData(sex){
      this.filter = sex;
    },
    errase(index){
      this.personas.splice(index,1);
      if(this.editable.id === index){
        this.editable.id = undefined;
        this.editable.persona = undefined;
      }
    },
    editMe(index){
      if(this.editable.id === index){
        this.editable.id = undefined;
        this.editable.persona = undefined;
      }else{
        this.editable.id = index;
        this.editable.persona = {
          nombre : this.personas[index].nombre,
          edad : this.personas[index].edad,
          sexo : this.personas[index].sexo
        }
      }
    },
    confirmEdition(){
      if(this.checkForm(2)){
        let index = this.editable.id;
        this.personas[index].nombre = this.editable.persona.nombre;
        this.personas[index].edad = this.editable.persona.edad;
        this.personas[index].sexo = this.editable.persona.sexo;
        this.editable.persona = undefined; 
      }
    },
    editName(name){
      this.editable.persona.nombre = name;
    },
    editSex(sex){
      this.editable.persona.sexo = sex;
    },
    editAge(edad){
      this.editable.persona.edad = edad
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
