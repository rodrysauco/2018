<template>
  <section class='addPerson'>
    <form v-on:submit.prevent>
      <div v-if="errors">
				<ul>
					<li style="color:red;" v-for="error in errors">{{ error }}</li>
				</ul>
			</div>
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
      <select id="sex" @input="sexChanged" :value="sexo" class="pointer">
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
  export default {
    name: 'add-person',
    props: {
      errors: Array,
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
      },
    }
  }
</script>

<style>
  .pointer{
    cursor: pointer;  
  }
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