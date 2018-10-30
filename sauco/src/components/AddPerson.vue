<template>
  <section class='addPerson'>
    <span class="title">
      {{this.title}} persona
    </span>
    <el-form :model="persona" :rules="rules" ref="persona">
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="persona.nombre" id="name" placeholder="Ingrese nombre"></el-input>
      </el-form-item>
      <el-form-item label="Edad" prop="edad">
        <el-input type="number" v-model.number="persona.edad" id="edad" min="0"></el-input>
      </el-form-item>
      <el-form-item label="Sexo" prop="sexo">
        <el-select v-model="persona.sexo" placeholder="Seleccione">
          <el-option label="Masculino" value="Masculino"></el-option>
          <el-option label="Femenino" value="Femenino"></el-option>
          <el-option label="Pansexual" value="Pansexual"></el-option>
          <el-option label="Hermafrodita" value="Hermafrodita"></el-option>
          <el-option label="Otro" value="Otro"></el-option>
        </el-select>
      </el-form-item>
      <div class="action" v-if="title ==='Editar'">
        <el-button type="primary" @click="edit('persona')">Confirmar</el-button>
        <el-button @click="cancelar">Cancelar</el-button>
      </div>
      <div class="action" v-else>
        <el-button type="primary" @click="agregar('persona')">Confirmar</el-button>
      </div>
    </el-form>
  </section>
</template>

<script>
  import router from "@/router";
  import pplService from "@/services/pplService";
  export default {
    name: 'add-person',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Edad requerida'));
        }
        else {
          if (value < 1) {
            callback(new Error('Edad incorrecta'));
          } else {
            callback();
          }
        }
      };
      return {
        title: '',
        errores: [],
        persona: {
          id: 0,
          nombre: "",
          edad: 0,
          sexo: ""
        },
        rules: {
          nombre: [
            { required: true, message: "Falta el nombre", trigger: 'blur' },
          ],
          edad: [
            { validator: checkAge, trigger: 'blur' }
          ],
          sexo: [
            { required: true, message: "Falta el sexo", trigger: 'blur' },
          ]
        }
      }
    },
    beforeMount() {
      this.checkStatus();
    },
    methods: {
      checkStatus() {
        if (this.$route.params.id !== undefined) {
          this.title = "Editar"
          pplService.getOne(this.$route.params.id) // eslint-disable-next-line
            .then((p) => this.persona = p, (error) => console.log(error));
        } else {
          this.title = "Agregar";
          this.persona.nombre = "";
          this.persona.edad = 0;
          this.persona.sexo = "";
        }
      },
      cancelar() {
        router.push("/");
      },
      edit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) { // eslint-disable-next-line
            console.log('Complete los campos');
            return false;
          } else {
            pplService.replace(this.persona);
            this.$notify({
              title: 'Exito',
              message: 'Hemos editado la persona',
              type: 'info',
              showClose: false
            });
            router.push("/");
          }
        });
      },
      agregar(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) { // eslint-disable-next-line
            console.log('Complete los campos');
            return false;
          } else {
            pplService.save(
              this.persona.nombre,
              this.persona.edad,
              this.persona.sexo
            );
            this.$notify({
              title: 'Exito',
              message: 'Hemos agregado la persona',
              type: 'success',
              showClose: false
            });
            this.persona.nombre = "";
            this.persona.edad = "";
            this.persona.sexo = "";
            router.push("/");
          }
        });
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

  .title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    margin-left: 30px;
  }

  .action {
    padding: 5px 5px 0 0;
    vertical-align: bottom;
  }
</style>