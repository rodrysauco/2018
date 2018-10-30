<template>
  <section class='addPerson'>
    {{this.title}} persona
    <form v-on:submit.prevent>
      <div v-if="errores">
        <ul>
          <li style="color:red;" v-for="(error, index) in errores" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div class="inputDetails">
        <label for="name">Nombre: </label>
        <input type="text" @input="nameChanged" v-model="persona.nombre" id="name" placeholder="Ingrese nombre" class="nameImput">
      </div>
      <div class="inputDetails">
        <label for="edad">Edad: </label>
        <input type="number" @input="ageChanged" v-model="persona.edad" id="edad" placeholder="Ingrese edad" min="0"
          class="ageInput">
      </div>
      <div class="inputDetails">
        <label for="sex">Sexo: </label>
        <select id="sex" @input="sexChanged" v-model="persona.sexo" class="pointer">
          <option value="" selected disabled>Seleccione</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Pansexual">Pansexual</option>
          <option value="Hermafrodita">Hermafrodita</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div class="action" v-if="title ==='Editar'">
        <button @click="edit" class="pointer">Confirmar</button>
        <button @click="cancelar"  class='pointer'>Cancelar</button>
      </div>
        <div class="action" v-else>
          <button @click="agregar" class="pointer">Confirmar</button>
        </div>
    </form>
  </section>
</template>

<script>
  import router from "@/router";
  import pplService from "@/services/pplService";
  export default {
    name: 'add-person',
    data() {
      return {
        title:'',
        errores: [],
        persona: {
          id: 0,
          nombre: "",
          edad: 0,
          sexo: ""
        }
      }
    },
    beforeMount(){
      this.checkStatus();
    },
    //this part is commented because it overflow the system
    // updated(){
    //   console.log("updated");
    //   this.checkStatus();
    // },
    methods: {
      checkStatus(){
        if(this.$route.params.id !== undefined){
        this.title = "Editar"
        pplService.getOne(this.$route.params.id) // eslint-disable-next-line
          .then((p)=>this.persona = p, (error)=> console.log(error));
        }else{
          this.title = "Agregar";
          this.persona.nombre = "";
          this.persona.edad = 0;
          this.persona.sexo = "";
        }
      },
      nameChanged(event) {
        this.persona.nombre = event.target.value;
      },
      cancelar(){
        router.push("/");
      },
      edit(){
        if(this.checkForm()){
          pplService.replace(this.persona);
          router.push("/");
        }
      },
      ageChanged(event) {
        this.persona.edad = event.target.value;
      },
      sexChanged(ricardo) {
        this.persona.sexo = ricardo.target.value;
      },
      agregar() {
        let flag = this.checkForm();
        if (flag) {
          if (this.persona.nombre !== "" && this.persona.edad !== "" && this.persona.sexo !== "") {
            pplService.save(
              this.persona.nombre,
              this.persona.edad,
              this.persona.sexo
            );
            this.persona.nombre = "";
            this.persona.edad = "";
            this.persona.sexo = "";
            router.push("/");
          }
        }
      },
      checkForm() {
        let err = [];
        if (!this.persona.nombre) {
          err.push("Falta el nombre");
        }
        if (!this.persona.edad) {
          err.push("Falta la edad");
        }else{
          if(this.persona.edad < 0){
            err.push("Todavia no naciste cabrón");
          }else if(this.persona.edad > 100){
            err.push("Los fosiles no usan PC");
          }
        }
        if (!this.persona.sexo) {
          err.push("Falta el sexo");
        }
        this.errores = err;
        if (this.errores.length === 0) {
          return true;
        }
      },
    }
  }
</script>

<style>
  .pointer {
    cursor: pointer;
  }

  .addPerson {
    width: 100%;
  }

  .inputDetails {
    display: inline-block;
    padding: 0 5px 5px 0;
  }

  .action {
    padding: 5px 5px 0 0;
    vertical-align: bottom;
  }
</style>