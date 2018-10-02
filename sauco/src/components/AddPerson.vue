<template>
  <section class='addPerson'>
    <div class="inputDetails">
      <label for="name">Nombre: </label>
      <input type="text" @input="nameChanged" :value="name" id="name" placeholder="Ingrese nombre" class="nameImput">
    </div>
    <div class="inputDetails">
      <label for="edad">Edad: </label>
      <input type="number" @input="ageChanged" :value="edad" id="edad" placeholder="Ingrese edad" min="0" class="ageInput">
    </div>
    <div class="inputDetails">
      <label for="sex">Sexo: </label>
      <select id="sex" @input="sexChanged" :value="sexo">
        <option value="" selected disabled>Seleccione</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Pansexual">Pansexual</option>
        <option value="Hermafrodita">Hermafrodita</option>
        <option value="Otro">Otro</option>
      </select>
    </div>
    <div class="action">
      <button @click="agregar">Agregar</button>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'add-person',
    props: {
      name: String,
      edad: 0,
      sexo: String
    },
    methods: {
      nameChanged(event) {
        this.$emit('name', event.target.value);
      },
      ageChanged(event) {
        this.$emit('edad', event.target.value);
      },
      sexChanged(ricardo) {
        this.$emit('sexo', ricardo.target.value);
      },
      agregar() {
        this.$emit('doIt');
      }
    }
  }
</script>

<style>
  .addPerson{
    width: 100%;
  }
  .inputDetails{
    display: inline-block;
    padding: 0 5px 5px 0;
  }
  .action{
    padding: 5px 5px 0 0;
    vertical-align: bottom;
  }
</style>