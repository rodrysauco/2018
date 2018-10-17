<template>
  <section class='addPerson'>
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
      <div class="action">
        <button @click="agregar" class="pointer">Realizar</button>
      </div>
    </form>
  </section>
</template>

<script>
  import pplService from "@/services/pplService";
  export default {
    name: 'add-person',
    data() {
      return {
        errores: [],
        persona: {
          id: 0,
          nombre: "",
          edad: 0,
          sexo: ""
        }
      }
    },
    props: {
      errors: Array,
      name: String,
      edad: 0,
      sexo: String
    },
    methods: {
      nameChanged(event) {
        this.persona.nombre = event.target.value;
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
          }
        }
      },
      checkForm(type) {
        let err = [];
        if (!this.persona.nombre) {
          err.push("Falta el nombre");
        }
        if (!this.persona.edad) {
          err.push("Falta la edad");
        }
        if (!this.persona.sexo) {
          err.push("Falta el sexo");
        }
        this.errores = err;
        if (this.persona.nombre && this.persona.edad && this.persona.sexo) {
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